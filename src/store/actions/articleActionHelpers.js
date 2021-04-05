import store from '../store/store'

export const findIndexByArticleTitle = (title, reducer) =>{
  return (getState) => {
    const articles = getState()[reducer].articles
    const index = articles.findIndex(el => el.title === title)
    return index
  }
}

export const replaceArticleInArticlesArray = (article, reducer) =>{
  let articles = store.getState()[reducer].articles.slice() 
  const index = articles.findIndex(el => el.title === article.title)
  let newArticleList = [...articles.slice(0,index), article, ...articles.slice(index+1)]
  return newArticleList
}

export const addArticleToLocalStorage = (article) => {
  const bookmarkedArticles = getItemFromLocalStorage("bookmarkedArticles",[])
  let newArticles = [...bookmarkedArticles, article]
  addItemToLocalStorage("bookmarkedArticles", newArticles) 
}

export const getItemFromLocalStorage = (key, defaultValue) => {
  console.log("get item from local storage called")
  try{
    if(localStorage.getItem(key) !== null){
      return JSON.parse(localStorage.getItem(key)) 
    }
    else{
      return defaultValue
    }
  }catch(error){
    console.log(error)
    return defaultValue
  }
}

export const addItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

// export const articleHelpers = {
//   replaceArticleInArray : (article, reducer) => {
//     let articles = store.getState()[reducer].articles.slice() 
//     const index = articles.findIndex(el => el.title === article.title)
//     let newArticleList = [...articles.slice(0,index), article, ...articles.slice(index+1)]
//     return newArticleList
//   }
// }

// export const localStorageHelpers = {
//   getItem: (key, defaultValue) => {
//     try{
//       if(localStorage.getItem(key) !== null){
//         return JSON.parse(localStorage.getItem(key)) 
//       }
//       else{
//         return defaultValue
//       }
//     }catch(error){
//       console.log(error)
//       return defaultValue
//     }
//   },

//   setItem: (key,value) =>{
//     localStorage.setItem(key, JSON.stringify(value))
//   }
// }