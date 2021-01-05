import { SET_USER_DETAILS } from "../constants/userActions";

const initialState = {
  user: ""
};

const rootReducer = (state = initialState, action = "") => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        user: action.payload.user
      };

    default:
      return state;
  }
};

export default rootReducer;
