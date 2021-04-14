import * as types from "../types/userTypes";

const initialState = {
  loggedIn: false,
};

const userReducer = (state = initialState, action='') => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        articles: action.payload,
      }
    case types.IS_LOADING:
      return{
        ...state,
        isLoading: true,
        errorMsg:'',

      }
      case types.USER_REGISTER_SUCCEEDED:
      return{
        ...state,
        username: action.payload.username,
        isLoading: false,
        registeredSuccessful: true,
        errorMsg:'',
        confirmationToken: action.payload.confirmationToken
      }
    case types.USER_REGISTRATION_FAILED:
    return{
      ...state,
      errorMsg: action.payload,
      isLoading: false,
      registeredSuccessful: false,
    }
    case types.DO_CONFIRM_REGISTRATION:
      return {
      ...state,
      confirmationToken:action.payload.token
    }
    case types.USER_LOGIN_SUCCEEDED:
      return{
        ...state,
        username : action.payload.username,
        isLoading: false,
        loggedIn: true,
        errorMsg:''
      }
    case types.USER_LOGIN_FAILED:
      return{
        ...state,
        errorMsg: action.payload,
        isLoading: false,
      }
    case types.DO_LOGOUT_USER:
        return state;

    default:
      return state;
  }
};

export default userReducer ;