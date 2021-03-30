import axios from 'axios'
import { NEWS_API_KEY } from '../../keys';

import * as types from "../types/newsAPIsearchTypes"

const BASE_URL = "https://newsapi.org/v2/everything?q="


export const handelArticleSearch = (searchTerm) => {
	return async dispatch => {
		dispatch(loadArticleSearch())
		const url = `${BASE_URL}${searchTerm}&apiKey=${NEWS_API_KEY}`
		try{
			const response = await axios.get(url)
			dispatch(articleSearchSuccesful(response.data.articles))
		}catch(error) {
			console.log(error)
			let message = error.response !== undefined ? error.response.data : "could not get articles"
			dispatch(articleSearchError(message))
		}
	}
}

export const loadArticleSearch = () => {
	return{
		type: types.LOAD_ARTICLE_SEARCH
	}
}

export const articleSearchSuccesful = (articles) => {
	return {
		type: types.ARTICLE_SEARCH_SUCCESS,
		payload: articles
	}
}

export const articleSearchError = errorMsg => {
	return {
		type: types.ARTICLE_SEARCH_ERROR,
		payload: errorMsg
	}
}