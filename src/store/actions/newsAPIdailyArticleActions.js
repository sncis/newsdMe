import * as types from "../types/newsAPIdailyArticleTypes"
import { getItemFromLocalStorage } from './actionHelpers/articleActionHelpers'


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
};

export const setDailyArticlesSuccess = articles => {
  return{
    type: types.SET_DAILY_ARTICLES_SUCCESS,
    payload: articles
  }
};