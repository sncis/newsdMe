import axios from 'axios';
import { NEWS_API_KEY } from '../../keys';
import {IS_LOADING_ARTICELS,
	SET_DAILY_ARTICLES_ERROR,
	SET_DAILY_ARTICLES } from "../constants/articelTypes"

import { dummyArticles, dailyArticles } from '../dummyArticles';

const newsApiBaseUrl = "https://newsapi.org/v2/"


export const isLoadingDailyArticles =()=>{
	return{
		type: IS_LOADING_ARTICELS,
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


export const handleSearch = (term) => {

}



	// return axios.get(url).then(response => {
		// 	// console.log(response)
		// 	dispatch(bookmarkResponse(response.data.articles))
		
		// })
		// .catch(error => {
		// 	// console.log(error)
			
		// })
