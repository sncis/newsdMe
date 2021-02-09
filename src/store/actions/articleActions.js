import axios from "axios";
import store from "../store/store"


import { IS_LOADING_ARTICELS,
  GET_USER_ARTICELS_SUCCESSFUL,
  GET_USER_ARTICELS_ERROR,
  ADD_ARTICLE_TO_SAVED_ARTICLELIST,
 } from '../constants/articelTypes'
 
 import { setDailyArticles } from './newsApiActions'



const backendBaseUrl = "http://localhost:8080/";

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
  return (dispatch, getState) => {
    dispatch(loadUserArticels())
    // console.log("getting user articles")
    const url = `${backendBaseUrl}articles?username=${getState().userReducer.userName}`
    // const url = `${backendBaseUrl}articles?username=someUser`

    header.headers.Authorization = `Bearer ${getState().userReducer.jwtToken}`
  //header.headers.Authorization = `Bearer ${testToken}`

    return axios
      .get(url,header)
      .then(response => {
        // console.log(response.data)
        dispatch(getUserArticelsSuccessfull(response.data));
      })
      .catch(error => {
        // console.log(error)
        let message = error.response ? error.response.data.message : "something went wrong"
        // console.log(error)
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


/**Bookmark Actions */
export const saveUserArticle = (article) => {
  return dispatch => {
    dispatch(setBookmarkInDailyArticles(article.title, article.source.name))
    dispatch(addArticleToSavedArticleList(article))
    dispatch(storeArticleInDB(article))
  }
}

export const setBookmarkInDailyArticles = (title, source) => {
  return (dispatch, getState) => {
    const articles = getState().articleReducer.dailyArticles.slice()

    const index = articles.findIndex((el) => el.title === title && el.source.name === source )
    articles[index].isBookmarked = true
    const bookmarkedArticles = localStorage.getItem("bookmarkedArticles") !== null ? JSON.parse(localStorage.getItem("bookmarkedArticles")) : []
    console.log("bookmakred in dialy")
    console.log(bookmarkedArticles)
    bookmarkedArticles.push(articles[index])

    

    localStorage.setItem("bookmarkedArticles", JSON.stringify(bookmarkedArticles))

    // console.log(articles[index])
    console.log('loac storage from save ')
    console.log(localStorage)
    console.log("bookmakred in dialy after push ")
    console.log(bookmarkedArticles)
    
    dispatch(setDailyArticles(articles))
    // return articles 
  }
  
  
    
}

export const storeArticleInDB = (article) => {
  return (dispatch, getState) => {
    const username = getState().userReducer.userName;
    const token = getState().userReducer.jwtToken
    const url=`${backendBaseUrl}articles?username=${username}`
    header.headers.Authorization = `Bearer ${token}`
    const jsonArticle = JSON.stringify(article)
   
    return axios
      .post(url,jsonArticle,header)
      .then(response => {
        // console.log(response)
        dispatch(getUserArticelsSuccessfull(response.data))
      }).catch(error => {
        // console.log(error)
        let msg  = error.response ?  error.response.data.message : "could not store article"
        dispatch(getUserArticelsError(msg))
        console.log(msg)
      })
  }
}


export const addArticleToSavedArticleList = article => {
  return{
   type: ADD_ARTICLE_TO_SAVED_ARTICLELIST,
   payload: article
  }
}



export const removeUserArticle = (article) => {
  //shift to title in backend
  
  // const articleArr = deleteArticleFromArray(article.title)
  return (dispatch, getState) => {
    // dispatch(setDailyArticles(articleArray))
    dispatch(removeBookmarkInDailyArticles(article.title))
    dispatch(deleteArticleInDB(article.title, getState().userReducer.jwtToken))
    dispatch(deleteArticleFromArray(article.title))
    // deleteArticleFromArray(article.title)
    // dispatch(getUserArticelsSuccessfull(articleArr))

  }
}

export const removeBookmarkInDailyArticles = title => {
  return (dispatch, getState) => {
    const articles = getState().articleReducer.dailyArticles.slice()
    const index = articles.findIndex(el => el.title === title)
    articles[index].isBookmarked = false

    const bookmarkedArticles = localStorage.getItem("bookmarkedArticles") !== null ? JSON.parse(localStorage.getItem("bookmarkedArticles")) : []
    console.log("boomakred in delete ")
    console.log(bookmarkedArticles)

    const articlesNotToDelete =[]

    bookmarkedArticles.forEach(el => !title.includes(el.title) ? articlesNotToDelete.push(el) : null)
    // bookmarkedArticles.filter(el => el.title.title)
    console.log(articlesNotToDelete)
    localStorage.setItem("bookmarkedArticles", JSON.stringify(articlesNotToDelete))

    dispatch(setDailyArticles(articles))
  }
}


const deleteArticleFromArray = title => {
  console.log("remove in saved as called")
  return (dispatch, getState) => {
    const storeArticles = getState().articleReducer.savedArticles.slice();
    const articlesNotToDelete =[]
  storeArticles.forEach(el => !title.includes(el.title) ? articlesNotToDelete.push(el): null)

    console.log(articlesNotToDelete)
    dispatch(getUserArticelsSuccessfull(articlesNotToDelete))
  }
}

export const deleteArticleInDB = (title,jwtToken) => {
  return dispatch => {
    const url=`${backendBaseUrl}articles/article?title=${title}`
    header.headers.Authorization = `Bearer ${jwtToken}`
    return axios
      .delete(url,header)
      .then(response => {
        console.log(response.data)
        // const articlesArr = deleteArticleFromArray(article.id)
        // dispatch(getUserArticelsSuccessfull(articlesArr))
      }).catch(error => {
        // console.log(error)
        let message  = error.response ?  error.response.data.message : "could not delete article"
        // // dispatch(storeArticleError(msg))
        console.log(message)
      })
  }
  
}







