import * as types from "../../types/userTypes";
import { deleteCookies } from "../actionHelpers/actionUtils";


/********** login actions *******************/

export const loginUserAction = user =>
   async (dispatch, getState, {backendFetcher}) => {
     dispatch(loginUserLoading())

     await backendFetcher({url:"/auth/login", method:'get'}).catch(e => console.log(e))

     const options = {url: "/auth/login",method: "post",data: JSON.stringify(user)}
    try{
       await backendFetcher(options)
        dispatch(loginUserSucceeded(user.username))
    }catch(error){
      dispatch(loginUserError(error.message));
    }
};


export const loginUserLoading = () => {
  return{
    type: types.IS_LOADING
  }
};

export const loginUserSucceeded = (username ) => {
  return{
    type: types.USER_LOGIN_SUCCEEDED,
    payload: username
  }
};

export const loginUserError = (msg) => {
  return{
    type: types.USER_LOGIN_FAILED,
    payload: msg
  }
};

export const logoutAction = () =>
  async (dispatch, getState, {backendFetcher}) => {
    const options={
      url:"/logout",
      method: "post",
    }
    try{
      await backendFetcher(options)
    }catch(error){
      return;
    }
    deleteCookies();
    window.sessionStorage.clear()
    dispatch(logout())

};



export const logout = () => {
  return {
    type: types.DO_LOGOUT_USER
  }
};

export const goToAdminSide = () =>
  async (dispatch,getState, {backendFetcher}) => {
    const options = {
      url:'/admin',
      method:'get'
    }
    try{
      const response = await backendFetcher(options)
      dispatch(goAdminSucceeded(response.data))
    }catch(error){
      dispatch(goAdminFailed(error.message))
    }
  };

export const goAdminSucceeded = (msgText) =>{
  return{
    type: types.DO_ADMIN_SUCCEEDED,
    payload: msgText
  }
}

export const goAdminFailed = (errorMsg) =>{
  return{
    type: types.DO_ADMIN_FAILED,
    payload: errorMsg

  }
};


