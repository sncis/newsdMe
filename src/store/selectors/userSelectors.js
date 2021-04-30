export const getUserLoginSelector = (state) =>{
	return state.userReducer.loggedIn
};

export const isLoadingUserSelector = (state) =>{
	return state.userReducer.isLoading
};

export const getErrorMsgSelector = (state) =>{
	return state.userReducer.errorMsg
};

export const getLoginSuccesfulSelector = (state) => {
	return state.userReducer.loginSuccessful
};


export const getRegisteredSelector = (state) => {
	return state.userReducer.registered
};

export const getConfirmationTokenSelector =(state) =>{
	return state.userReducer.confirmationToken
};

export const getConfirmedSelector =(state) =>{
	return state.userReducer.confirmed
};


export const getUsernameSelector = state => {
	return state.userReducer.username
};


export const getRegistrationSuccessSelector=(state)=>{
	return state.userReducer.registered
};

export const getResendTokenMsgSelector= (state)=>{
	return state.userReducer.resendTokenMsg
};
