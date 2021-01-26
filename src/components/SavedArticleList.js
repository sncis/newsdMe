import React from 'react';
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import SavedArticleComponent from "./SavedArticleComponent"



const SavedArticleListItem = ({ articles, isLoading}) => {
	return(
		<div className="savedArticles-list">
				{articles.length > 0 && articles.map(item => 
				<SavedArticleComponent article={item} key={uuidv4()} />)} 
			{isLoading && <p>Loading...!</p>}
		</div>
		
	)
}

const mapStateToProps = (state) =>{
	return{
		articles: state.articleReducer.savedArticles,
		isLoading: state.articleReducer.isLoading
	}
}

const SavedArticleList = connect(mapStateToProps, null)(SavedArticleListItem)

export default SavedArticleList;