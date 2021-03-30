import axios from 'axios'

import * as types from '../types/userArticelTypes'
 
import { setDailyArticlesSuccess } from './newsAPIdailyArticleActions'
import { replaceArticleInArticlesArray, addArticleToLocalStorage, getItemFromLocalStorage,addItemToLocalStorage } from './articleActionHelpers'

const BASE_URL = 'http://localhost:8080/'

const header = {
  headers:{
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
  }
}


export const getUserArticles = () => {
  return async (dispatch, getState) => {
    dispatch(loadUserArticles())
    const url = `${BASE_URL}articles?username=${getState().userReducer.userName}`
    const token = getItemFromLocalStorage('token', '')
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
    type: types.IS_LOADING_ARTICLES
  }
}

export const getUserArticlesSuccessful = (articles) => {
  return {
    type: types.GET_USER_ARTICLES_SUCCESS,
    payload: articles
  }
}

export const getUserArticlesError = errorMsg => {
  return {
    type: types.GET_USER_ARTICLES_ERROR,
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
   type: types.ADD_ARTICLE_TO_USER_ARTICLELIST,
   payload: article
  }
}

export const setBookmarkInDailyArticles = (article) => {
  return (dispatch) => {
    addArticleToLocalStorage(article)
    const articles = replaceArticleInArticlesArray(article, "newsAPIdailyArticleReducer")
   
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
    
    const articles = replaceArticleInArticlesArray(article,"newsAPIdailyArticleReducer")    
    console.log("articles from removeBookmark")
    console.log(articles)
    
    const bookmarkedArticles = getItemFromLocalStorage("bookmarkedArticles", [])
    const articlesNotToDelete = bookmarkedArticles.filter(el => el.id !== article.id)

    articlesNotToDelete.length > 0 ? addItemToLocalStorage("bookmarkedArticles", articlesNotToDelete) : localStorage.removeItem("bookmarkedArticles")
  
    dispatch(setDailyArticlesSuccess(articles))
  }
}

