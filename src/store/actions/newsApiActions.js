import axios from 'axios';
import { NEWS_API_KEY } from '../../keys';

import {IS_LOADING_API_ARTICELS,
	SET_DAILY_ARTICLES_ERROR,
	SET_DAILY_ARTICLES,
	LOAD_ARTICLE_SEARCH,
	ARTICLE_SEARCH_SUCCESSFUL,
	ARTICLE_SEARCH_ERROR
 } from "../constants/newsAPITypes"


import { dummyArticles, dailyArticles } from '../dummyArticles';

const newsApiBaseUrl = "https://newsapi.org/v2/"


export const isLoadingDailyArticles =()=>{
	return{
		type: IS_LOADING_API_ARTICELS,
	}
}

// export const dispatchApiRequest=()=> {
export const loadDailyArticles = () => {
	return async dispatch => {
		dispatch(isLoadingDailyArticles())
		
		// dispatch(bookmarkResponse(dummyArticles))
		const url = `${newsApiBaseUrl}top-headlines?country=de&apiKey=${NEWS_API_KEY}`
		try {
			const response = await axios.get(url)
			dispatch(bookmarkResponse(response.data.articles))
		}catch(error) {
			let message = error.response !== undefined ? error.response.data : "could not fetch daily articles"
			dispatch(setDailyArticlesError(message))
		}
	
	}
}

export const bookmarkResponse = (array) => {
	return dispatch =>{
		const bookmarkedArticles = localStorage.getItem("bookmarkedArticles") !== null ? JSON.parse(localStorage.getItem("bookmarkedArticles")) : null
		
		const titles = []
		const newArticles = []

		if(bookmarkedArticles !== null ){
			array.forEach(el => {
				titles.push(el.title)
			})
			array.forEach(el => titles.includes(el.title) ? bookmarkedArticles.forEach(item => item.title === el.title ? newArticles.push(item) : newArticles.push(el)) : null)
			
			dispatch(setDailyArticles(newArticles))
		}else{
			dispatch(setDailyArticles(array))
		}
	
		// array.forEach(el => titles.includes(el.title) ? null : newArticles.push(el))
		// array.forEach(el => titles.includes(el.title) ? newArticles.push(bookmarkedArticles.filter(item => item.title === el.title)) : newArticles.push(el))

	}
}

export const setDailyArticles = articles => {
  return{
    type: SET_DAILY_ARTICLES,
    payload: articles
  }
}


export const setDailyArticlesError = (message) => {
	return {
		type: SET_DAILY_ARTICLES_ERROR,
		payload: message
	}
}

export const loadArticleSearch = () =>{
	return{
		type: LOAD_ARTICLE_SEARCH
	}
}

export const articleSearchSuccesful = (articles) => {
	return {
		type: ARTICLE_SEARCH_SUCCESSFUL,
		payload: articles
	}
}

export const articleSearchError = errorMsg =>{
	return {
		type: ARTICLE_SEARCH_ERROR,
		payload: errorMsg
	}
}


export const handelArticleSearch = (searchTerm) => {
	return async dispatch => {
		dispatch(loadArticleSearch())
		const url = `${newsApiBaseUrl}everything?q=${searchTerm}&apiKey=${NEWS_API_KEY}`
		try{
			const response = await axios.get(url)
			console.log(response)
			dispatch(articleSearchSuccesful(response.data.articles))
		}catch(error) {
			console.log(error)
			let message = error.response !== undefined ? error.response.data : "could not get articles"
			dispatch(articleSearchError(message))
		}

	}

}
