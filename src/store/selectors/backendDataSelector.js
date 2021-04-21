
export const getBackendTextSelector = (state) => {
  return state.userReducer.backendText
}

export const getAdminSelector = (state) => {
  return state.userReducer.isAdmin
}

export const getBackendBackendErrorMsgSelector = (state) =>{
  return state.userReducer.errorMsg
}