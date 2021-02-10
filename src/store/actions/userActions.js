import axios from "axios";
import { USER_LOADING, 
  LOGIN_USER_ERROR, 
  LOGIN_USER_SUCCESS , 
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  SET_GEOLOCATION
} from "../constants/userTypes";

import { GOOGLE_API_KEY } from "../../keys"


const baseUrl = "http://localhost:8080/";

const header = {
  headers:{
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'ACCEPT': 'application/json'
}}


/**********Register actions */

export const registerUserAction= (user) => {
  return (dispatch) => {
    const url = `${baseUrl}register`
    dispatch(registerUserLoading(user))

    const jsonUser = JSON.stringify(user)
    
    return axios
      .post(url,jsonUser,header)
      .then(response => {
        console.log(response)
        dispatch(registerUserSuccess(response.data))
      }).catch(error => {
        console.log(error.response.data)
        let message = error.response ? error.response.data.message : "some error occured, please try again later"
        dispatch(registerUserError(message))
    })
  }
}

export const registerUserLoading = (user) => {
  return {
    type: USER_LOADING
  }
}
export const registerUserSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {userName: user.username}
  }
}

export const registerUserError =(errorMsg)=>{
  return{
    type: REGISTER_USER_ERROR,
    payload: errorMsg
  }
}


/**********login actions */

export const loginUserAction= (user) => {
  return (dispatch) => {
    dispatch(loginUserLoading())
    dispatch(loginUserSuccess("someUser", "sometoken"))
    console.log("loginuser called")

    // const url = `${baseUrl}login`
    // const jsonUser = JSON.stringify(user)
    // console.log("json user")
    // console.log(jsonUser)
    // return axios.post(url, jsonUser, header)
    //   .then(response =>{
    //     const jwtToken = response.data.jwtToken
    //     localStorage.setItem("token", JSON.stringify(jwtToken))
    //     dispatch(loginUserSuccess(user.userName, jwtToken))
    //   }).catch(error => {
    //     let message = error.response.data ? error.response.data.message :  'some error occured, please try again!'
    //     dispatch(loginUserError(message))
      // })  
  }
}


export const loginUserLoading = () => {
  return{
    type: USER_LOADING
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


export const logoutAction = () => {
  return {
    type: LOGOUT_USER
  }
}




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

