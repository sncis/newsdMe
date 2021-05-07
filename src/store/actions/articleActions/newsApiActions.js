import * as types from "../../types/newsAPIdailyArticleTypes"
import newsApiFetcher from "../../apiHelpers/newsApiFetcher";


export const fetchArticles = ()=>{
  return async dispatch => {
    dispatch(isLoadingArticles())
    const options ={
      url: "latest_headlines",
      params: {"lang": "de"}
    }
    try{
      const response = await newsApiFetcher(options)
      dispatch(fetchArticlesSucceeded(response.data.articles))
    }catch(error){
      dispatch(fetchArticlesFailed(error.message))
    }
  }
}

export const isLoadingArticles =()=>{
  return{
    type: types.IS_LOADING_ARTICLES,
  }
}


export const fetchArticlesSucceeded = (articles)=>{
  return {
    type: types.FETCH_ARTICLES_SUCCEEDED,
    payload: articles
  }
}

export const fetchArticlesFailed = (msg) => {
  return{
    type: types.FETCH_ARTICLES_FAILED,
    payload: msg
  }
}