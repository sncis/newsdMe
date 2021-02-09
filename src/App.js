import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./components/Home";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import DashboardComponent  from "./components/DashboardComponent";
import NavBar from "./components/NavBar"
import ProtectedRoute from "./components/ProtectedRoute"
import { Profiler } from "react";

// import TestArticle from "./components/TestArticle";
// import TestRouterComp from "./components/TestRouterComp";


/* when you dont have exact, the component with is mapped to "/" will always be shown with exact not 
  when you dont use switch, the order in with when components are listed matters. with exact "/" musst be the last one
  when componetns are in switch router weh have acces to there matched location and history via this.props 
  only components which are loaded through a route have route props. -> thats why its good to make conatainer components which are loaded by
  route and render other components. If router props are needed in component which are not used in Router components we
  can export them withRouter: export default withRouter(coponentName) in component file */
export function AppComp({isLoggedIn}) {
  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/register" component={RegisterComponent} />
        <Route path="/login" component={LoginComponent} />
        {/* <Route path="/dashboard" >{isLoggedIn ? (
          <Redirect to="/dashboard"/>) : (<Redirect to="/home" />
        )}</Route> */}

        <ProtectedRoute path="/dashboard" component={DashboardComponent} isLoggedIn={isLoggedIn}/>

        {/* <Route  path="/dashboard" component={DashboardComponent} /> */}
        {/* <Route path="/testToggle" component={TestArticle} /> */}
        {/* <Route path="/test" component={TestRouterComp} /> */}
      </Switch>

    </div>
   
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.userReducer.loggedIn
  }
}


const App = connect(mapStateToProps, null)(AppComp)
export default App;
