import axios from "axios";
import store from "../store/store"


import { LOAD_USER_ARTICELS,
  GET_USER_ARTICELS_SUCCESSFUL,
  GET_USER_ARTICELS_ERROR,
  ADD_ARTICLE_TO_SAVED_ARTICLELIST,
  SET_DAILY_ARTICLES,
 } from '../constants/articelTypes'


const backendBaseUrl = "http://localhost:8080/";

const newsApiBaseUrl = "https://newsapi.org/v2/"
// const testToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb21lVXNlciIsImV4cCI6MTYwOTg3OTYzNiwiaWF0IjoxNjA5ODYxNjM2fQ.Rzb1xsKUlAWKXTVMnT-olQXU4iWPFk0gf_kq2wXr7XvX5uPtN0T5AEoR4Hp7pd8awoumNc9bSxnpfhCAzEfa7A"
const header = {
  headers:{
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'ACCEPT': 'application/json'
  }
}

/** Loading user Articles from Backend */

export const getUserArticles = () => {
  return dispatch => {
    dispatch(loadUserArticels())
    console.log("getting user articles")
    const url = `${backendBaseUrl}articles?username=${store.getState().userReducer.userName}`
    // const url = `${backendBaseUrl}articles?username=someUser`

    header.headers.Authorization = `Bearer ${store.getState().userReducer.jwtToken}`
  //header.headers.Authorization = `Bearer ${testToken}`

    return axios
      .get(url,header)
      .then(response => {
        console.log(response.data)
        dispatch(getUserArticelsSuccessfull(response.data));
      })
      .catch(error => {
        let message = error.response ? error.response.data.message : "something went wrong"
        console.log(error.response)
        dispatch(getUserArticelsError(message))
      })

  }
}


export const loadUserArticels = () => {
  return {
    type: LOAD_USER_ARTICELS
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


/**Bookmark Actions */
export const setBookmarkInDailyArticles = id => {
  const articles = store.getState().articleReducer.dailyArticles.slice()
  const index = articles.findIndex((el) => el.id === id)
  articles[index].isBookmarked = true
  console.log(articles[index])

  return articles
}

export const removeBookmarkInDailyArticles = id => {
  const articles = store.getState().articleReducer.dailyArticles.slice()
  const index = articles.findIndex(el => el.id === id)
  articles[index].isBookmarked = false
  console.log(articles[index])

  return articles
}


const deleteArticleFromArray = articleId => {
  const storeArticles = store.getState().articleReducer.savedArticles.slice();
  const arr = storeArticles.filter(el => el.id !== articleId)
  console.log(arr)
  return arr
}



/** store and remove article actions*/

export const saveUserArticle = (article) => {
  const articleArray = setBookmarkInDailyArticles(article.id)
  return dispatch => {
    dispatch(setDailyArticles(articleArray))
    dispatch(addArticleToSavedArticleList(article))
    dispatch(storeArticleInDB(article))
  }
}

export const removeUserArticle = article => {
  const articleArray = removeBookmarkInDailyArticles(article.id)

  const articleArr = deleteArticleFromArray(article.id)
  return dispatch => {
    dispatch(setDailyArticles(articleArray))

    dispatch(deleteArticleInDB(article.id))
    dispatch(getUserArticelsSuccessfull(articleArr))

  }
}

export const storeArticleInDB = article => {
  return dispatch => {
    
    const url=`${backendBaseUrl}articles?username=${store.getState().userReducer.userName}`
    header.headers.Authorization = `Bearer ${store.getState().userReducer.jwtToken}`
    const jsonArticle = JSON.stringify(article)
   
    return axios
      .post(url,jsonArticle,header)
      .then(response => {
        console.log(response)
        dispatch(getUserArticelsSuccessfull(response.data))
      }).catch(error => {
        let msg  = error.response ?  error.response.data.message : "could not store article"
        dispatch(getUserArticelsError(msg))
        console.log(msg)
      })
  }
}

export const deleteArticleInDB = (id) => {
  return dispatch => {
    const url=`${backendBaseUrl}articles/article?id=${id}`
    header.headers.Authorization = `Bearer ${store.getState().userReducer.jwtToken}`
    return axios
      .delete(url,header)
      .then(response => {
        console.log(response)
        // const articlesArr = deleteArticleFromArray(article.id)
        // dispatch(getUserArticelsSuccessfull(articlesArr))
      }).catch(error => {
        let message  = error.response ?  error.response.data.message : "could not delete article"
        // dispatch(storeArticleError(msg))
        console.log(message)
      })
  }
  
}


export const addArticleToSavedArticleList = article => {
  return{
   type: ADD_ARTICLE_TO_SAVED_ARTICLELIST,
   payload: article
  }
}

export const setDailyArticles = articles =>{
  return{
    type: SET_DAILY_ARTICLES,
    payload: articles
  }
}


export const handleSearch = (term) => {

}


export const loadingDailyArticles = () =>{

}
