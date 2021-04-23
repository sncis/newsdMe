import Cookies from 'universal-cookie';

import { backendInstance } from '../../../axiosConfig'

import * as types from "../../types/userTypes";
// import backendApiFetcher from "../apiHelpers/backendApiFetcher";

/**********Register actions */

export const getRegister = (user) =>
  async (dispatch, getState, {backendFetcher}) => {

    const options = {
      url: "auth/register",
      method: "post",
      data: JSON.stringify(user)
    }
    try{
      const response = await backendFetcher(options)
      console.log("response from backend")
      console.log(response)

    }catch(error){
      console.log(error)
    }

}

export const registerUserAction = (user) =>
  async (dispatch, getState, {backendFetcher}) => {
    dispatch(registerUserLoading())
    const options = {url: "/auth/register", method: "post",data: JSON.stringify(user)}

    try{
      const response = await backendFetcher(options)
      console.log(response.data.token)
      dispatch(registerUserSucceeded(user.username, response.data.token))
    }catch(error){
      console.log(error.message)
      dispatch(registerUserFailed(error.message));
    }
  }


export const registerUserLoading = () => {
  return {
    type: types.IS_LOADING
  }
}
export const registerUserSucceeded = (username,token) => {
  return {
    type: types.USER_REGISTER_SUCCEEDED,
    payload: {user: username, confirmationToken: token }
  }
}

export const registerUserFailed =(errorMsg)=>{
  return{
    type: types.USER_REGISTRATION_FAILED,
    payload: errorMsg
  }
}

export const confirmRegistration = (token) =>
   //  console.log("***********************")
   // console.log("registration confirmation button clicked ")
   //  console.log("***********************")

    async (dispatch, getState, { backendFetcher }) => {
      dispatch(doConfirmRegistration())

      const options = {
        url: `auth/confirmUser?token=${token}`,

        method: "get"}

      try{
        const response = await backendFetcher(options)
        console.log(response)
        dispatch(confirmRegistrationSucceeded())
      }catch(error){
        console.log(error.message)
        dispatch(confirmRegistrationFailed(error.message))
      }
  }

export const doConfirmRegistration= () =>{
  return{
    type: types.DO_CONFIRM_REGISTRATION
  }
}

export const confirmRegistrationSucceeded = () =>{
  return{
    type: types.CONFIRM_REGISTRATION_SUCCEEDED,
  }
}

export const confirmRegistrationFailed = msg => {
  return {
    type: types.CONFIRM_REGISTRATION_FAILED,
    payload: msg
  }
}


