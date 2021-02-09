import axios from 'axios';
import { NEWS_API_KEY } from '../../keys';
import {IS_LOADING_ARTICELS,
	SET_DAILY_ARTICLES_ERROR,
	SET_DAILY_ARTICLES } from "../constants/articelTypes"
import { v4 as uuidv4 } from 'uuid';

import store from "../store/store"
import { dummyArticles, dailyArticles } from '../dummyArticles';

const newsApiBaseUrl = "https://newsapi.org/v2/"


export const isLoadingDailyArticles =()=>{
	return{
		type: IS_LOADING_ARTICELS,
	}
}

// export const dispatchApiRequest=()=> {
export const loadDailyArticles = () => {
	return dispatch => {
		dispatch(isLoadingDailyArticles())
		const url = `${newsApiBaseUrl}top-headlines?country=de&apiKey=${NEWS_API_KEY}`
		return axios.get(url).then(response => {
			dispatch(bookmarkResponse(response.data.articles))
			// let array = bookmarkResponse(response.data.articles)
			// let array = bookmarkResponse(dummyArticles)
			// dispatch(setDailyArticles(response.data))
		})
		.catch(error => {
			// console.log(error)
			let message = error.response ? error.response.data : "could not fetch daily articles"
			dispatch(setDailyArticlesError(message))
		})
	}
}

export const bookmarkResponse = (array) => {
	return dispatch =>{
		const bookmarkedArticles = localStorage.getItem("bookmarkedArticles") !== null ? JSON.parse(localStorage.getItem("bookmarkedArticles")) : []
		const titles = []
		 bookmarkedArticles.forEach(el => {
			titles.push(el.title)
		})
		array.forEach(el => titles.includes(el.title) ? el.isBookmarked=true : el.isBookmarked= false)

		dispatch(setDailyArticles(array))
	}
	// return array
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







/** filter response to not have them in article list again */

// const filterResponse = (arr)=>{
// 	const bookmarkedArticles = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]")

// 	const bookmakrTitles = []
// 	bookmarkedArticles.forEach(el => {
// 		bookmakrTitles.push(el.title)
// 	})
// 	console.log(bookmakrTitles)

// 	let result = arr.filter(el => !bookmakrTitles.includes(el.title))
	
// 	return result


// }

