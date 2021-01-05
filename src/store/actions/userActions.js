import axios from "axios";
import { SET_USER_DETAILS } from "../constants/userActions";

// import store from "../store/store";

export const setUserDetails = (user, token) => ({
  type: SET_USER_DETAILS,
  payload: user
});

export const loginUser = user => {
  return dispatch => {
    const url = "http://localhost:8080/login";
    axios
      .post(url, user)
      .then(response => {
        dispatch(setUserDetails(user.userName, response.data.jwtToken));
        console.log("dispatch test");
        console.log(response.data.jwtToken);
        console.log(user.userName);
      })
      .catch(error => {
        console.log(error);
      });
  };
};
