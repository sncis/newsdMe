import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import AuthPage from "./pages/AuthPage";
import DashboardPage from './pages/DashboardPage'
import { getUserLoginSelector } from "./store/selectors/userSelectors"
import { getAdminSelector } from "./store/selectors/backendDataSelector"
import AdminPage from "./pages/AdminPage";

export function App({isLoggedIn, isAdmin}) {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path="/auth/:index" render={(props)=>(<AuthPage {...props}/>)}/>
          <ProtectedRoute path='/dashboard' component={DashboardPage} isLoggedIn={isLoggedIn} isAuthorised={isLoggedIn} redirectPath='/auth/1'/>
          <ProtectedRoute path='/admin' component={AdminPage} isLoggedIn={isLoggedIn} isAuthorised={isAdmin} redirectPath='/dashboard'/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: getUserLoginSelector(state),
    isAdmin: getAdminSelector(state),
  }
}


export default connect(mapStateToProps, null)(App)
