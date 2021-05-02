
export const replaceArticleInArticlesArray = (article, articleArray) =>{
  const index = articleArray.findIndex(el => el.id === article.id);
  return [...articleArray.slice(0,index), article, ...articleArray.slice(index+1)]
};

export const addArticleToLocalStorage = (article) => {
  const bookmarkedArticles = getItemFromLocalStorage("bookmarkedArticles",[])
  let newArticles = [...bookmarkedArticles, article];
  addItemToLocalStorage("bookmarkedArticles", newArticles) 
};

export const getItemFromLocalStorage = (key, defaultValue) => {
  const articles = localStorage.getItem(key)
  if(articles !== null ){
    try{
       return JSON.parse(localStorage.getItem(key));
    }catch(error){
      return defaultValue
    }
  }else{
    return defaultValue
  }
};

export const addItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
};
