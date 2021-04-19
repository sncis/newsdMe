import axios from 'axios';
import { NEWS_API_KEY } from '../../keys';

import * as types from "../types/newsAPIdailyArticleTypes"
import { getItemFromLocalStorage } from './articleActionHelpers'
import newsApiFetcher from "../apiHelpers/newsApiFetcher";


const BASE_URL = "https://newsapi.org/v2/"

export const isLoadingApiArticles =()=>{
	return{
		type: types.IS_LOADING_ARTICLES,
	}
}

// export const loadNewsArticles = ()=> {
// 	return async dispatch => {
// 		const options ={
// 			url: "latest_headlines",
// 			params: {"lang": "de"}
// 		}
// 		try{
// 			const response = await newsApiFetcher(options)
// 		}catch(error){
// 			console.log(error)
// 		}
// 	}
// }

// export const loadDailyArticles = () => {
// 	return async dispatch => {
// 		dispatch(isLoadingApiArticles())
//
// 		// dispatch(bookmarkResponse(dummyArticles))
// 		const url = `${BASE_URL}top-headlines?country=de&apiKey=${NEWS_API_KEY}`
// 		try {
// 			const response = await axios.get(url)
// 			console.log("errorrr in response from newsAPI")
// 			console.log(response)
// 			// dispatch(bookmarkBookmarkedArticlesInAPIResponse(response.status))
// 		}catch(error) {
// 			let message = error.message !== undefined ? error.response.data : "could not fetch daily articles"
// 			// dispatch(setDailyArticlesError(message))
// 		}
// 	}
// }

export const bookmarkBookmarkedArticlesInAPIResponse = (dailyArticles) => {
	return dispatch =>{
		const bookmarkedArticles = getItemFromLocalStorage("bookmarkedArticles", []) 
		
			const titles = []
			const articles = []

			if(bookmarkedArticles.length > 0){
				dailyArticles.forEach(el => titles.push(el.title))
				dailyArticles.forEach(el => titles.includes(el.title) ? bookmarkedArticles.forEach(item => item.title === el.title ? articles.push(item) : articles.push(el)) : null)
			
				dispatch(setDailyArticlesSuccess(articles))
			}else{
				dispatch(setDailyArticlesSuccess(dailyArticles))
			}
	}
}

export const setDailyArticlesSuccess = articles => {
  return{
    type: types.SET_DAILY_ARTICLES_SUCCESS,
    payload: articles
  }
}


export const setDailyArticlesError = (message) => {
	return {
		type: types.SET_DAILY_ARTICLES_ERROR,
		payload: message
	}
}

