import React from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import Article from './Article'
import "../../css/ArticleList.css"

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

ArticleList.propTypes = {
	listType : PropTypes.string.isRequired,
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


const mapStateToProps = (state, ownProp)=>{
	return{
		articles: ownProp.listType ? state[`${ownProp.listType}Reducer`].articles :[],
		isLoading: ownProp.listType ? state[`${ownProp.listType}Reducer`].isLoading : false,
		errorMsg: ownProp.listType ? state[`${ownProp.listType}Reducer`].errorMsg : "some error occured"
	}	
}



export default connect(mapStateToProps, null)(ArticleList)

