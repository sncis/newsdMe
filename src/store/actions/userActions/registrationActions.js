import * as types from "../../types/userTypes";


export const registerUserAction = (user) =>
  async (dispatch, getState, backendApiFetcher) => {
    dispatch(userActionLoading());
    // await backendFetcher({url:"/auth/login", method:'get'}).catch(e => console.log(e));

    const options = {url: "/auth/register", method: "post",data: JSON.stringify(user)};

    try{
      await backendApiFetcher({url:"/auth/login", method:'get'})
      await backendApiFetcher(options);
      dispatch(registerUserSucceeded(user.username))
    }catch(error){
      dispatch(registerUserFailed(error.message));
    }
  };


export const userActionLoading = () => {
  return {
    type: types.IS_LOADING
  }
};

export const registerUserSucceeded = (username) => {
  return {
    type: types.USER_REGISTER_SUCCEEDED,
    payload: {user: username}
  }
};

export const registerUserFailed =(errorMsg)=>{
  return{
    type: types.USER_REGISTRATION_FAILED,
    payload: errorMsg
  }
};

export const confirmRegistration = (token) =>
    async (dispatch, getState, backendApiFetcher ) => {
      dispatch(userActionLoading());

      const options = {url: `/auth/confirm?token=${token}`,method: "get"};

      try{
        await backendApiFetcher(options);
        dispatch(confirmRegistrationSucceeded())
      }catch(error){
        dispatch(confirmRegistrationFailed(error.message))
      }
  };

export const confirmRegistrationSucceeded = () =>{
  return{
    type: types.CONFIRM_REGISTRATION_SUCCEEDED,
  }
};

export const confirmRegistrationFailed = msg => {
  return {
    type: types.CONFIRM_REGISTRATION_FAILED,
    payload: msg
  }
};

export const resendConfirmationToken = email =>
  async (dispatch, getState , backendApiFetcher) => {
    dispatch(userActionLoading());
    const options ={ url: "/auth/resendConfirmationToken", method:"post",data: email};

    try{
      await backendApiFetcher(options);
      dispatch(resendConfirmationTokenDone("Successfully resend token."))
    }catch(error){
      dispatch(resendConfirmationTokenDone(error.message))
    }
};

export const resendConfirmationTokenDone = (msg) =>{
  return {
    type: types.RESEND_REGISTRATIONTOKEN_MSG,
    payload: msg
  }
};

