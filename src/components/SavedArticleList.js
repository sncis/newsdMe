import React from 'react';
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import SavedArticleComponent from "./SavedArticleComponent"



export const SavedArticleListItem = ({ articles, isLoading, errorMsg}) => {
	return(
		<div className="savedArticles-list">
			{articles.length > 0 && articles.map(item => 
			<SavedArticleComponent article={item} key={uuidv4()} />)} 
			{isLoading && <p className="isLoading">Loading...!</p>}
			{articles.length === 0 && errorMsg && <p className="errorMsg">{errorMsg}</p>}
		</div>
		
	)
}

const mapStateToProps = (state) =>{
	return{
		articles: state.articleReducer.savedArticles,
		isLoading: state.articleReducer.isLoading,
		errorMsg: state.articleReducer.savedArticlesErrorMsg
	}
}

const SavedArticleList = connect(mapStateToProps, null)(SavedArticleListItem)

export default SavedArticleList;