import React from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import Article from './Article'
import "../css/ArticleList.css"

import dummy from "../assets/img/dummy.jpg";
import { dummyArticles } from '../store/dummyArticles'

export const ArticleList = ({listType, articles, isLoading, errorMsg}) =>{
	return(
		<div className={listType}>
			{articles.length > 0 && articles.map(item => (
				<Article key={uuidv4()} articleType={listType} article={item} />
			))}

			{ articles.length === 0 && !isLoading && errorMsg && <p className="noArticleError"> { errorMsg }</p> }
			{ articles.length === 0 && isLoading && <p className="loadingMsg"> Loading....!</p>}
		
		</div>
	)
}

const mapStateToProps = (state, ownProp)=>{
	return{
		articles: ownProp.listType === 'daily' ? state.articleReducer.dailyArticles : state.articleReducer.savedArticles,
		// articles:dummyArticles,
		errorMsg: ownProp.listType === 'daily' ? state.articleReducer.errorMsg : state.articleReducer.savedArticlesErrorMsg,
		isLoading: state.articleReducer.isLoading
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


// export default ArticleList