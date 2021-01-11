import axios from "axios";
import store from "../store/store"
import { LOGIN_USER_LOADING, 
  LOGIN_USER_ERROR, 
  LOGIN_USER_SUCCESS , 
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR} from "../constants/constants";


const baseUrl = "http://localhost:8080/";

const header ={
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

export const registerUserAction= (user) => {
  return (dispatch) => {
    const url = `${baseUrl}register`
    dispatch(registerUserLoading(user))
    
    return axios
      .post(url,header, user)
      .then(response => {
        // console.log(response)
        dispatch(registerUserSuccess(response.data))
      }).catch(error => {
        let message = error.response.data ? error.response.data.message : "some error occured, please try again later"
        dispatch(registerUserError(message))
      })
  }
}

export const registerUserLoading = (user) => {
  return {
    type: REGISTER_USER_LOADING
  }
}
export const registerUserSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {username: user.username}
  }
}

export const registerUserError =(errorMsg)=>{
  return{
    type: REGISTER_USER_ERROR,
    payload: errorMsg
  }
}

export const loginUserLoading = () => {
  return{
    type: LOGIN_USER_LOADING
  }
}

export const loginUserSuccess = (username, token ) => {
  return{
    type: LOGIN_USER_SUCCESS,
    payload: {userName: username, jwtToken: token}
  }
}

export const loginUserError = (msg) => {
  return{
    type: LOGIN_USER_ERROR,
    payload: msg
  }
}

export const loginUserAction= (user) => {
  return (dispatch) => {
    dispatch(loginUserLoading())
    const url = `${baseUrl}login`

    return axios.post(url, user, header)
      .then(response =>{
        const jwtToken = response.data.jwtToken
        dispatch(loginUserSuccess(user.userName, jwtToken))
      }).catch(error => {
        let message = error.response.data ? error.response.data.message :  'some error occured, please try again!'
        dispatch(loginUserError(message))
      })  
  }
}
