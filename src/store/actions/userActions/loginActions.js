import * as types from "../../types/userTypes";
import {deleteCookies} from "../actionHelpers/actionUtils";


/**********login actions *******************/

export const loginUserAction = user =>
   async (dispatch, getState, {backendFetcher}) => {
     dispatch(loginUserLoading())

     const options = {url: "/auth/login",method: "post",data: JSON.stringify(user)}
    try{
       await backendFetcher(options)
        dispatch(loginUserSucceeded(user.username))
    }catch(error){
       console.log("login error")
      dispatch(loginUserError("Wrong username or password"));
    }
}


export const loginUserLoading = () => {
  return{
    type: types.IS_LOADING
  }
}

export const loginUserSucceeded = (username, jwtToken ) => {
  return{
    type: types.USER_LOGIN_SUCCEEDED,
    payload: {username: username, jwtToken: jwtToken}
  }
}

export const loginUserError = (msg) => {
  console.log(msg)
  return{
    type: types.USER_LOGIN_FAILED,
    payload: msg
  }
}

export const logoutAction = () => {
  return dispatch => {
    deleteCookies()
    window.sessionStorage.clear()
    dispatch(logout())

  }
}



export const logout = () => {
  return {
    type: types.DO_LOGOUT_USER
  }
}

export const goToAdminSide = () =>
    async (dispatch,getState, {backendFetcher}) => {
      const options = {
        url:'/articles/admin',
        method:'get'
      }
      try{
        const response = await backendFetcher(options)
        dispatch(goAdminSucceeded(response.data))
      }catch(error){
        console.log(error.message)
        dispatch(goAdminFailed(error.message))
      }
    }

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
}

// export const doLogout = () => {
//   return dispatch => {
//     try{
//       window.sessionStorage.clear()
//       dispatch(logout())
//     }catch(error){
//       console.log("error from doLogout")
//       console.log(error)
//     }
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

