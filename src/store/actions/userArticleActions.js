import axios from 'axios'

//refactor import to * as 
import { IS_LOADING_ARTICLES,
  GET_USER_ARTICLES_SUCCESS,
  GET_USER_ARTICLES_ERROR,
  ADD_ARTICLE_TO_USER_ARTICLELIST,
 } from '../types/userArticelTypes'
 
import { setDailyArticlesSuccess } from './newsAPIdailyArticleActions'
import { replaceArticleInArticlesArray, addArticleToLocalStorage, getItemFromLocalStorage } from './articleActionHelpers'
// import  newsAPIdailyArticleReducer from '../reducers/newsAPIdailyArticleReducer'

const BASE_URL = 'http://localhost:8080/'

const header = {
  headers:{
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
  }
}



/** Loading user Articles from Backend */

//refactor to extract localStorage behavior ?
export const getUserArticles = () => {
  return async (dispatch, getState) => {
    dispatch(loadUserArticles())
    const url = `${BASE_URL}articles?username=${getState().userReducer.userName}`
    const token = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')) : null
    header.headers["Authorization"]= `Bearer ${token}`

    try{
      const response = await axios.get(url, header)
      dispatch(getUserArticlesSuccessful(response.data))
    }catch(error){
      let message = error.response !== undefined ? error.response.data.message : "could not fetch saved articles"
      dispatch(getUserArticlesError(message))
    }

  }
}


export const loadUserArticles = () => {
  return {
    type: IS_LOADING_ARTICLES
  }
}

export const getUserArticlesSuccessful = (articles) => {
  return {
    type: GET_USER_ARTICLES_SUCCESS,
    payload: articles
  }
}

export const getUserArticlesError = errorMsg => {
  return {
    type: GET_USER_ARTICLES_ERROR,
    payload: errorMsg
  }
}

export const saveUserArticle = (article) => {
  return async (dispatch, getState) => {
    const username = getState().userReducer.userName
    const url = `${BASE_URL}articles?username=${username}`
    article.source = article.source.name ? article.source.name : article.source

    const jsonArticle = JSON.stringify(article)
    const token = getItemFromLocalStorage('token', '')

    header.headers.Authorization = `Bearer ${token}`

    try{
      const response = await axios.post(url, jsonArticle, header)
      dispatch(addArticleToUserArticleList(response.data))
      dispatch(setBookmarkInDailyArticles(response.data))

    }catch(error){
      console.log(error)
      let message = error.response ? error.response.data.message : "something went wrong"
       dispatch(getUserArticlesError(message))
    }
   
  }
}

export const addArticleToUserArticleList = article => {
  return{
   type: ADD_ARTICLE_TO_USER_ARTICLELIST,
   payload: article
  }
}

//used to set a bookmark in daily articles when article is saved
export const setBookmarkInDailyArticles = (article) => {
  return (dispatch) => {
    addArticleToLocalStorage(article)
    const articles = replaceArticleInArticlesArray(article, "dailyArticle")
   
    const bookmarkedArticles = getItemFromLocalStorage("bookmarkedArticles",[])
    bookmarkedArticles.push(article)
    addArticleToLocalStorage("bookmarkedArticles", articles)
    
    dispatch(setDailyArticlesSuccess(articles))
  }  
}



export const removeUserArticle = (article) => {
  return (dispatch) => {
    dispatch(deleteArticleInDB(article))
  }
}


export const deleteArticleInDB = (article) => {
  return async dispatch => {
    const url=`${BASE_URL}articles/article?id=${article.id}`
    // const url=`${baseUrl}articles/article?id=100000`

    const token = getItemFromLocalStorage('token', '')

    header.headers.Authorization = `Bearer ${token}`
    
    try{
      await axios.delete(url,header)
      dispatch(removeBookmarkInDailyArticles(article))
      dispatch(getUserArticles())
    }catch(error){
      let message  = error.response !== undefined ?  error.response.data.message : "could not delete article"
      dispatch(getUserArticlesError(message))
    }  
  }
}


export const removeBookmarkInDailyArticles = article => {
  return (dispatch) => {
    
    const articles = replaceArticleInArticlesArray(article,"dailyArticle")    
    console.log("articles from removeBookmark")
    console.log(articles)
    
    const bookmarkedArticles = getItemFromLocalStorage("bookmarkedArticles", [])
    const articlesNotToDelete = bookmarkedArticles.filter(el => el.id !== article.id)

    articlesNotToDelete.length > 0 ? localStorage.setItem("bookmarkedArticles", JSON.stringify(articlesNotToDelete)) : localStorage.removeItem("bookmarkedArticles")
  
    dispatch(setDailyArticlesSuccess(articles))
  }
}

