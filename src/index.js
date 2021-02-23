import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import store from "../src/store/store/store"
import "./index.css";
import { LOGIN_USER_SUCCESS, LOGOUT_USER } from "./store/constants/userTypes";


const token = localStorage.getItem("token")
  if(token !== null){
    store.dispatch({type:LOGIN_USER_SUCCESS, payload: {userName: "someUser"}})
  }else{
    store.dispatch({type:LOGOUT_USER})
  }

const app = (
  
  <Provider store={store}>
     <BrowserRouter>
    <App />
  </BrowserRouter>

  </Provider>
 
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
