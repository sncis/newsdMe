import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import AuthPage from "./pages/AuthPage";
import DashboardPage from './pages/DashboardPage'
import { getUserLoginSelector } from "./store/selectors/userSelectors"

export function App({isLoggedIn}) {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path="/auth/:index" render={(props)=>(<AuthPage {...props}/>)}/>
          <ProtectedRoute path='/dashboard' component={DashboardPage} isLoggedIn={isLoggedIn}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: getUserLoginSelector(state)
  }
}


export default connect(mapStateToProps, null)(App)
