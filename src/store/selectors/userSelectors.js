export const getUserLoginSelector = (state) =>{
	return state.userReducer.loggedIn
}

export const isLoadingUserSelector = (state) =>{
	return state.userReducer.isLoading
}

export const getErrorMsgSelector = (state) =>{
	return state.userReducer.errorMsg
}

export const getLoginSuccesfulSelector = (state) => {
	return state.userReducer.loginSuccessful
}


export const getRegisterSuccessfulSelector = (state) => {
	return state.userReducer.registerSuccessful
}

export const getConfirmationTokenSelector =(state) =>{
	return state.userReducer.confirmationToken
}

export const getUsernameSelector = state => {
	return state.userReducer.username
}

