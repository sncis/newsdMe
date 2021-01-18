import React from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


import ArticleComponent from "./ArticleComponent";
import "../css/ArticleList.css"


const ArticleListItem = ({articles, isLoading, errorMsg}) => {
	return (
		<div>
				{articles.length > 0 && articles.map(item => (
					<ArticleComponent article={item} key={uuidv4()} />
				))}

				{ articles.length === 0 && !isLoading && <p> no saved articles</p>}
				{ articles.length === 0 && !isLoading && errorMsg && <p className="noArticleError"> { errorMsg }</p> }
				{ isLoading && <p className=""> Loading....!</p>}
			</div>
	)
}

const mapStateToProps = (state)=>{
	return{
		articles: state.articleReducer.articles,
		errorMsg: state.articleReducer.errorMsg,
		isLoading: state.articleReducer.isLoading
	}
}
const ArticleList = connect(mapStateToProps, null)(ArticleListItem)

export default ArticleList