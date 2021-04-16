import Cookies from 'universal-cookie';

import { backendInstance } from '../../axiosConfig'

import * as types from "../types/userTypes";
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
    const options = {
      url: "auth/register",
      method: "post",
      data: JSON.stringify(user)
    }
    try{
      const response = await backendFetcher(options)
      console.log(response.data.token)
      // dispatch(registerUserSuccess(response.data.token))
    }catch(error){
      console.log(error.message)
      dispatch(registerUserError(error.message));
    }
  }


// export const registerUserAction = (user) => {
//   return async (dispatch) => {
//     const url = "auth/register"
//     const jsonUser = JSON.stringify(user)
//
//     dispatch(registerUserLoading())
//
//     try {
//       const response = await backendInstance.post(url, jsonUser);
//       console.log(response);
//
//       dispatch(registerUserSuccess(response.data));
//     } catch (error) {
//       let message = error.response !== undefined ?  error.response.data.message : "some error occured, please try again later";
//       dispatch(registerUserError(message));
//     }
//   }
// }

export const registerUserLoading = () => {
  return {
    type: types.IS_LOADING
  }
}
export const registerUserSuccess = (user) => {
  return {
    type: types.USER_REGISTER_SUCCEEDED,
    payload: user.username
  }
}

export const registerUserError =(errorMsg)=>{
  return{
    type: types.USER_REGISTRATION_FAILED,
    payload: errorMsg
  }
}

export const confirmRegistration = (token) =>{
  return async (dispatch) =>{
    const url=`confirmUser?token=${token}`
    try{
      const response = await backendInstance.get(url)
      dispatch(confirmRegistrationSuccess(response.data.token))
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }
}

export const confirmRegistrationSuccess =(token)=>{
  return{
    action: types.DO_CONFIRM_REGISTRATION,
    payload: token
  }
}


/**********login actions *******************/

export const loginUserAction = user => {
  return async (dispatch) => {
    // dispatch(loginUserSuccess("some user", "some token "))

    dispatch(loginUserLoading())

    const url = "auth/login"
    const jsonUser = JSON.stringify(user)

    try{
      const response = await backendInstance.post(url, jsonUser)
      const cookies = new Cookies(response.headers.cookie)
      console.log(cookies)
      const csrfToken = cookies.get('XSRF-TOKEN');
      backendInstance.defaults.headers["X-XSRF-TOKEN"] = csrfToken
      dispatch(loginUserSuccess(user.username))
    }catch(error){
      console.log(error)
     let message = error.response !== undefined ? error.response.data.message : 'some error occured, please try again!';
      dispatch(loginUserError(message));
    }

  }
}


export const loginUserLoading = () => {
  return{
    type: types.IS_LOADING
  }
}

export const loginUserSuccess = (username, jwtToken ) => {
  return{
    type: types.USER_LOGIN_SUCCEEDED,
    payload: {username: username, jwtToken: jwtToken}
  }
}

export const loginUserError = (msg) => {
  return{
    type: types.USER_LOGIN_FAILED,
    payload: msg
  }
}


export const logoutAction = () => {
  return async dispatch =>{
    const url = "logout"
    try{
      const response =await backendInstance.get(url)
      console.log("responsed ata from logout")
      console.log(response.data)

      console.log(response.data)
      dispatch(logout())
    }catch(error){
      console.log(error)
      console.log(error.response)
    }
    // await backendInstance.get(url)
  }
}


export const logout = () => {
  return {
    type: types.DO_LOGOUT_USER
  }
}

export const doLogout = () => {
  return dispatch => {
    try{
      window.sessionStorage.clear()
      dispatch(logout())
    }catch(error){
      console.log("error from doLogout")
      console.log(error)
    }
  }

}

// export const logoutAction = ()=>{
//   return async (dispatch) => {
   
//     const url = "logout"
//     dispatch(logout)

//   try{
//     const response = await backendInstance.get(url)
//     console.log(response)
//   }catch(error){
//     console.log(error.response)
  
//   }
//   }
// }



/**********Geolocation actions */

// const googleGeo = (latitude, longitude) => {
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
//   console.log(`$url for google: ${url}`)
//   return axios.get(url).then(response =>{
//     console.log(response)
//   }).catch(error => {
//     console.log(error)
//   })
// }

// const success= (pos) => {
//   console.log(`longitude ${pos.coords.longitude}`)
//   console.log(`latitude ${pos.coords.latitude}`)
//   googleGeo(pos.coords.latitude, pos.coords.longitude)
// }
// const error = () => {
//   return (dispatch) => {
//     dispatch(setGeolocation(['us']))
//   }

// }
// const retrieveGeolocation = () => {

// navigator.geolocation.getCurrentPosition(success, error)
  
// }


// export const getGeolocation = () => {
//   const location = retrieveGeolocation() 
//   console.log(location)
//   return dispatch => {
//     dispatch(setGeolocation(location))
//   }
// }

// export const setGeolocation = location => {
//   return {
//     type: SET_GEOLOCATION,
//     payload: location

//   }
// }

