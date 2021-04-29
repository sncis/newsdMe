import * as types from '../types/userArticelTypes'
import { replaceArticleInArticlesArray, addArticleToLocalStorage, getItemFromLocalStorage,addItemToLocalStorage } from './actionHelpers/articleActionHelpers'
import {fetchArticlesSucceeded} from "./articleActions/newsApiActions";
import {getArticlesSelector} from "../selectors/articleSelectors";


export const getUserArticles = () =>
    async (dispatch, getState, {backendFetcher}) =>{
      dispatch(loadUserArticles());
      const options ={ url: "/articles", method: 'get'};
      try{
        const response = await backendFetcher(options)
        dispatch(getUserArticlesSucceeded(response.data))
      }catch(error){
        dispatch(getUserArticlesError(error.message))
      }
    };

export const saveUserArticle = article =>
  async(dispatch,getState,{backendFetcher})=> {
    const options = {url: "/articles", method: "post",data: JSON.stringify(article)};

    try {
      await backendFetcher(options);
      storeArticleInLocalStorage(article);
      dispatch(addArticleToUserArticleList(article));
      dispatch(replaceArticleInNewsAPIArticlesArray(article))

    } catch (error) {
      dispatch(getUserArticlesError(error.message))
    }
  };

export const loadUserArticles = () => {
  return {
    type: types.IS_LOADING_ARTICLES
  }
};


export const getUserArticlesError = errorMsg => {
  return {
    type: types.GET_USER_ARTICLES_ERROR,
    payload: errorMsg
  }
};

export const getUserArticlesSucceeded = (articles) => {
  return {
    type: types.GET_USER_ARTICLES_SUCCESS,
    payload: articles
  }
};


///to have artcile in dashboard list where articles from backend are stored
export const addArticleToUserArticleList = article => {
  return{
   type: types.ADD_ARTICLE_TO_USER_ARTICLELIST,
   payload: article
  }
};

export const storeArticleInLocalStorage = (article) => {
  const bookmarkedArticles = getItemFromLocalStorage("bookmarkedArticles",[]);
  bookmarkedArticles.push(article);
  addArticleToLocalStorage(bookmarkedArticles)
};

export const replaceArticleInNewsAPIArticlesArray = (article)=> {
  return (dispatch, getState) => {
    const ownProps={listType:"newsApiArticle"};
    const apiArticles = getArticlesSelector(getState(), ownProps);
    const articles = replaceArticleInArticlesArray(article, apiArticles);

    dispatch(fetchArticlesSucceeded(articles))
  }
};

export const removeUserArticle = (article) => {
  return (dispatch) => {
    dispatch(deleteArticleInDB(article))
  }
};


export const deleteArticleInDB  = (article)=>
  async (dispatch, getState, {backendFetcher}) => {

    const options = {url: `/articles/article?id=${article._id}`,method: 'delete'};
    try{
      await backendFetcher(options);
      dispatch(removeBookmarkInDailyArticles(article));
      removeArticleFromLocalStorage(article);
      dispatch(getUserArticles())

    }catch(error){
      dispatch(getUserArticlesError(error.message))
    }
  };


export const removeArticleFromLocalStorage = article => {
  const bookmarkedArticles = getItemFromLocalStorage("bookmarkedArticles", []);
  const articlesNotToDelete = bookmarkedArticles.filter(el => el.id !== article.id);

  articlesNotToDelete.length > 0 ? addItemToLocalStorage("bookmarkedArticles", articlesNotToDelete) : localStorage.removeItem("bookmarkedArticles")
};

export const removeBookmarkInDailyArticles = (article) => {
  return (dispatch, getState) => {
    const ownProps ={listType: "newsApiArticle"};
    // const articleArray = getArticlesSelector(getState,ownProps)
    const articles = replaceArticleInArticlesArray(article, getArticlesSelector(getState(),ownProps));
    dispatch(fetchArticlesSucceeded(articles))
  }
};

