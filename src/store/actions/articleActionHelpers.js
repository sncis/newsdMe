import store from '../store/store'
import {getDefaultNormalizer} from "@testing-library/dom";

export const findIndexByArticleTitle = (title, reducer) =>{
  return (getState) => {
    const articles = getState()[reducer].articles
    const index = articles.findIndex(el => el.title === title)
    return index
  }
}

export const replaceArticleInArticlesArray = (article, articleArray) =>{
  const index = articleArray.findIndex(el => el.id === article.id)
  let newArticleList = [...articleArray.slice(0,index), article, ...articleArray.slice(index+1)]

  return newArticleList
}

export const addArticleToLocalStorage = (article) => {
  const bookmarkedArticles = getItemFromLocalStorage("bookmarkedArticles",[])
  let newArticles = [...bookmarkedArticles, article]
  addItemToLocalStorage("bookmarkedArticles", newArticles) 
}

export const getItemFromLocalStorage = (key, defaultValue) => {

  const articles = localStorage.getItem(key)
  if(articles !== null ){
    try{
      let item = JSON.parse(localStorage.getItem(key))
      return item
    }catch(error){
      console.log(error)
      return defaultValue
    }
  }else{
    return defaultValue
  }

}

export const addItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
