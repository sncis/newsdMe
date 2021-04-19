export const getArticlesSelector = (state, ownProp) => {
	return ownProp.listType ? state[`${ownProp.listType}Reducer`].articles : []
}
// export const getArticlesSelector = (state, ownProp) => {
// 	return state.newsApiArticleReducer.articles
// }

// export const isLoadingArticlesSelector = (state, ownProp) => {
// 	return state.newsApiArticleReducer.isLoading
// }
//
// export const getArticleErrorMsgSelector = (state, ownProp) => {
// 	return state.newsApiArticleReducer.errorMsg
// }
export const isLoadingArticlesSelector = (state, ownProp) => {
	return ownProp.listType ? state[`${ownProp.listType}Reducer`].isLoading : false
}

export const getArticleErrorMsgSelector = (state, ownProp) => {
	return ownProp.listType ? state[`${ownProp.listType}Reducer`].errorMsg : 'some error occured'
}

// export const getArticleErrorMsgSelector = (state, ownProp) => {
// 	return ownProp.listType ? state[`${ownProp.listType}Reducer`].errorMsg : 'some error occured'
// }
