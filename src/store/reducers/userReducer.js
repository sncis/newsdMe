import * as types from "../types/userTypes";

const initialState = {
  loggedIn: false,
};

const userReducer = (state = initialState, action='') => {
  switch (action.type) {
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
        registered: true,
        errorMsg:'',
        confirmationToken: action.payload.confirmationToken
      }
    case types.USER_REGISTRATION_FAILED:
    return{
      ...state,
      errorMsg: action.payload,
      isLoading: false,
      registered: false,
    }
    case types.CONFIRM_REGISTRATION_SUCCEEDED:
      return {
      ...state,
        isLoading:false,
        registered: true,
    }
    case types.CONFIRM_REGISTRATION_FAILED:
      return{
        ...state,
        isLoading:false,
        registered:false,
        errorMsg: action.payload
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
      return{
        loggedIn: false,
      }

    default:
      return state;
  }
};

export default userReducer ;