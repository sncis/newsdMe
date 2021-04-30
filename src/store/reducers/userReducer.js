import * as types from "../types/userTypes";

const initialState = {
  loggedIn: false,
  isAdmin:false,
  confirmed: false,
};

const userReducer = (state = initialState, action='') => {
  switch (action.type) {
    case types.IS_LOADING:
      return{
        ...state,
        isLoading: true,
        errorMsg:'',
        isAdmin:false,
      };
      case types.USER_REGISTER_SUCCEEDED:
      return{
        ...state,
        username: action.payload.username,
        isLoading: false,
        registered: true,
        errorMsg:'',
        confirmationToken: action.payload.confirmationToken
      };
    case types.USER_REGISTRATION_FAILED:
    return{
      ...state,
      errorMsg: action.payload,
      isLoading: false,
      registered: false,
    };
    case types.CONFIRM_REGISTRATION_SUCCEEDED:
      return {
      ...state,
        isLoading:false,
        registered: true,
        errorMsg:'',
        confirmed: true,
    };
    case types.CONFIRM_REGISTRATION_FAILED:
      return{
        ...state,
        isLoading:false,
        registered: true,
        confirmed: false,
        errorMsg: action.payload,

      };
    case types.USER_LOGIN_SUCCEEDED:
      return{
        ...state,
        username : action.payload.username,
        isLoading: false,
        loggedIn: true,
        errorMsg:'',
        confirmed: true,
      };
    case types.USER_LOGIN_FAILED:
      return{
        ...state,
        errorMsg: action.payload,
        isLoading: false,
        confirmed: false,

      };
    case types.DO_LOGOUT_USER:
      return{
        loggedIn: false,
        isAdmin:false,
      };
    case types.DO_ADMIN_FAILED:
      return{
        ...state,
        isAdmin: false,
        errorMsg: action.payload,
      };
    case types.DO_ADMIN_SUCCEEDED:
      return{
        ...state,
        backendText: action.payload,
        isAdmin: true,
      };
    case types.RESEND_REGISTRATIONTOKEN_SUCCEEDED || types.RESEND_REGISTRATIONTOKEN_FAILED:
     return {
      ...state,
       resendTokenMsg: action.payload
    };

    default:
      return state;
  }
};

export default userReducer ;