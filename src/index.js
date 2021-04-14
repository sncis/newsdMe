import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import store from "../src/store/store/store"
import "./index.css";
import { USER_LOGIN_SUCCEEDED, DO_LOGOUT_USER } from "./store/types/userTypes";

store.dispatch({type:USER_LOGIN_SUCCEEDED, payload: {userName: "someUser"}})

// const token = localStorage.getItem("token")
//   if(token !== null){
//     store.dispatch({type:USER_LOGIN_SUCCEEDED, payload: {userName: "someUser"}})
//   }else{
//     store.dispatch({type:DO_LOGOUT_USER})
//   }

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
