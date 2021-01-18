import axios from "axios";
import store from "../store/store"

import { dummyArticles } from "../dummyArticles"

import { LOAD_USER_ARTICELS,
  GET_USER_ARTICELS_SUCCESSFUL,
  GET_USER_ARTICELS_ERROR,
  SET_BOOKMARK,
  SET_UNBOOKMARK,
 } from '../constants/articelTypes'


const baseUrl = "http://localhost:8080/";
const testToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb21lVXNlciIsImV4cCI6MTYwOTg3OTYzNiwiaWF0IjoxNjA5ODYxNjM2fQ.Rzb1xsKUlAWKXTVMnT-olQXU4iWPFk0gf_kq2wXr7XvX5uPtN0T5AEoR4Hp7pd8awoumNc9bSxnpfhCAzEfa7A"
const header = {
  headers:{
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'ACCEPT': 'application/json'
}}


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

// export const getUserArticles = (userName) => {
//   return dispatch => {
//     dispatch(loadUserArticels())
//     setTimeout(() => {
//       dispatch(getUserArticelsSuccessfull(dummyArticles))
//     },200);
//   }
// }



export const handleSearch = (term) => {

}



  export const getUserArticles = () => {
    return dispatch => {
      dispatch(loadUserArticels())
    
  
      // const url = `http://localhost:8080/dashboard/user?${store.getState().userName}`
      const url = `${baseUrl}dashboard/articles?user=someUser`
  
     header.headers.Authorization = `Bearer ${store.getState().userReducer.jwtToken}`
    //   //  header.headers.Authorization = `Bearer ${testToken}`
  
      return axios
        .get(url,header)
        .then(response => {
          // console.log(response.data)
          dispatch(getUserArticelsSuccessfull(response.data));
        })
        .catch(error => {
          let message = error.response.data ? error.response.data.message : "something went wrong"
          console.log(error.response)
          dispatch(getUserArticelsError(message))
        })

  }
}


export const unBookmark = article => {
  const oldArticles = store.getState().articleReducer.articles.slice()
  const index = oldArticles.findIndex(el => el.id === article.id)
  oldArticles[index].isBookmarked = false
  return dispatch =>{
    dispatch(setUnbookmark(oldArticles))
  }
}

export const bookmark = article => {
  const oldArt = store.getState().articleReducer.articles.slice()
  const index = oldArt.findIndex((el) => el.id === article.id)
  oldArt[index].isBookmarked = true
  return dispatch => {
    dispatch(setBookmark(oldArt))
  }

}

export const setUnbookmark = (newArticles) => {
  return{
    type:SET_UNBOOKMARK,
    payload: newArticles
  }
}

export const setBookmark = (newArtArray) => {
  return {
    type:SET_BOOKMARK,
    payload: newArtArray
  }
}