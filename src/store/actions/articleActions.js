import axios from 'axios'

import { IS_LOADING_ARTICELS,
  GET_USER_ARTICELS_SUCCESSFUL,
  GET_USER_ARTICELS_ERROR,
  ADD_ARTICLE_TO_SAVED_ARTICLELIST,
 } from '../constants/articelTypes'
 
import { setDailyArticles } from './newsApiActions'

const baseUrl = 'http://localhost:8080/'

const header = {
  headers:{
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',

  }
}



/** Loading user Articles from Backend */

export const getUserArticles = () => {
  return (dispatch, getState) => {
    dispatch(loadUserArticels())
    // console.log("getting user articles")
    const url = `${baseUrl}articles?username=${getState().userReducer.userName}`
    const token = localStorage.getItem('token') !== null ? localStorage.getItem('token') : null
    header.headers["Authorization"]= `Bearer ${token}`

    return axios
      .get(url,header)
      .then(response => {
        dispatch(getUserArticelsSuccessfull(response.data));
      })
      .catch(error => {
        let message = error.response.data !== undefined ? error.response.data.message : "could not fetch saved articles"
        dispatch(getUserArticelsError(message))
      })

  }
}


export const loadUserArticels = () => {
  return {
    type: IS_LOADING_ARTICELS
  }
}

export const getUserArticelsSuccessfull = (articels) => {
  return {
    type: GET_USER_ARTICELS_SUCCESSFUL,
    payload: articels
  }
}

export const getUserArticelsError = errorMsg => {
  return {
    type:GET_USER_ARTICELS_ERROR,
    payload: errorMsg
  }
}

export const setBookmarkInDailyArticles = (article) => {
  return (dispatch, getState) => {
    const articles = getState().articleReducer.dailyArticles.slice()

    const index = articles.findIndex((el) => el.title === article.title)
    console.log("article in save article")
    console.log(article)
   
    const bookmarkedArticles = localStorage.getItem("bookmarkedArticles") !== null ? JSON.parse(localStorage.getItem("bookmarkedArticles")) : []
    bookmarkedArticles.push(article)
    localStorage.setItem("bookmarkedArticles", JSON.stringify(bookmarkedArticles))

    articles[index] = article
    
    dispatch(setDailyArticles(articles))
  }  
}

export const saveUserArticle = (article) => {
  return async (dispatch, getState) => {
    const username = getState().userReducer.userName
    const url = `${baseUrl}articles?username=${username}`
    article.source = article.source.name ? article.source.name : article.source

    const jsonArticle = JSON.stringify(article)
    const token = localStorage.getItem('token') === null ? null : localStorage.getItem('token')

    header.headers.Authorization = `Bearer ${token}`

    try{
      const res = await axios.post(url, jsonArticle, header)
      console.log(res.data)
      dispatch(addArticleToSavedArticleList(res.data))
      dispatch(setBookmarkInDailyArticles(res.data))

    }catch(error){
      console.log(error)
       dispatch(getUserArticelsError(error.response.data.message))
    }
   
  }
}


export const addArticleToSavedArticleList = article => {
  return{
   type: ADD_ARTICLE_TO_SAVED_ARTICLELIST,
   payload: article
  }
}

export const removeUserArticle = (article) => {
  return (dispatch) => {
    dispatch(deleteArticleInDB(article.id))
  }
}

export const removeBookmarkInDailyArticles = article => {
  return (dispatch, getState) => {
    const articles = getState().articleReducer.dailyArticles.slice()
    const index = articles.findIndex(el => el.title === article.title)
   
    articles[index] = article
   
    const bookmarkedArticles = localStorage.getItem("bookmarkedArticles") !== null ? JSON.parse(localStorage.getItem("bookmarkedArticles")) : []
    const articlesNotToDelete = bookmarkedArticles.filter(el => el.id !== article.id)
    localStorage.setItem("bookmarkedArticles", JSON.stringify(articlesNotToDelete))
  
    dispatch(setDailyArticles(articles))
  }
}

export const deleteArticleInDB = (id) => {
  return async dispatch => {
    const url=`${baseUrl}articles/article?id=${id}`
    // const url=`${baseUrl}articles/article?id=100000`

    const token = localStorage.getItem('token') !== null ? localStorage.getItem('token'): null
    header.headers.Authorization = `Bearer ${token}`

    try{
      const response = await axios.delete(url,header)
      dispatch(removeBookmarkInDailyArticles(response.data))
      console.log(response.data)
      dispatch(getUserArticles())
    }catch(error){
      console.log(error.response)
      let message  = error.response !== undefined ?  error.response.data.message : "could not delete article"

      console.log(message)
    }
    
  }
  
}

