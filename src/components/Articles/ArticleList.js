import React from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import Article from './Article'
import "../../css/ArticleList.css"
import { dummyArticles } from "../../store/dummyArticles";

export const ArticleList = ({listType, articles, isLoading, errorMsg}) =>{
	return(
		<div className='article-list'>
			{articles.length > 0 && articles.map(item => (
				<Article key={uuidv4()} articleType={listType} article={item} />
			))}

			{ articles.length === 0 && !isLoading && errorMsg && <p className="noArticleError">{ errorMsg }</p> }
			{ articles.length === 0 && isLoading && <p className="loadingMsg"> Loading....!</p>}
		
		</div>
	)
}

const mapStateToProps = (state, ownProp)=>{
	switch(ownProp.listType){
		case 'daily':
			return{
				// articles: dummyArticles,
				articles: state.newsAPIdailyArticleReducer.articles,
				isLoading: state.newsAPIdailyArticleReducer.isLoading,
				errorMsg: state.newsAPIdailyArticleReducer.errorMsg
			}
		case 'user':
			return{
				articles: state.userArticleReducer.articles,
				isLoading: state.userArticleReducer.isLoading,
				errorMsg: state.userArticleReducer.errorMsg
			}
		case 'search':
			return{
				articles: state.newsAPIsearchReducer.articles,
				isLoading: state.newsAPIsearchReducerReducer.isLoading,
				errorMsg: state.newsAPIsearchReducerReducer.errorMsg
			}
		default:
			return{
				articles: [],
				isLoading: false,
				errorMsg:''
			}
	}
}

ArticleList.propTypes = {
	listType : PropTypes.string,
	articles :PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		description: PropTypes.string,
		url: PropTypes.string,
		source : PropTypes.any,
		isBookmarked: PropTypes.bool,
	})),
	isLoading: PropTypes.bool,
	errorMsg: PropTypes.string
}

export default connect(mapStateToProps, null)(ArticleList)

