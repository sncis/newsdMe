import {
  SET_USER_INFO, 
  LOGIN_USER_LOADING, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_ERROR, 
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
}  from "../constants/userTypes";

const initialState = {
  isLoading: false
  // articles: [],
  // userName: ''
};

const userReducer = (state = initialState, action='') => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        articles: action.payload,
      }
    case REGISTER_USER_LOADING:
      // console.log("registerUser Loading dispathced from reducer")
      // console.log(action)
      return{
        ...state,
        isLoading: true
      }
      case REGISTER_USER_SUCCESS:
      // console.log("registerUser Loading dispathced from reducer")
      // console.log(action)
      return{
        ...state,
        username: action.payload.username,
        isLoading: false,
      }
    case REGISTER_USER_ERROR:
    // console.log(action)
    return{
      ...state,
      errorMsg: action.payload,
      isLoading: false
    }
    case LOGIN_USER_LOADING:
      // console.log("login from reducer ")
      // console.log(action)
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_USER_SUCCESS:
    // console.log(action)
      return{
        ...state,
        userName : action.payload.userName,
        jwtToken: action.payload.jwtToken,
        isLoading: false,
        loginSuccessful: true
      }
    case LOGIN_USER_ERROR:
      return{
        ...state,
        errorMsg: action.payload,
        isLoading: false
      }

    default:
      return state;
  }
};

export default userReducer ;