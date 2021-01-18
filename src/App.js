import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import DashboardComponent  from "./components/DashboardComponent";
// import TestArticle from "./components/TestArticle";
// import TestRouterComp from "./components/TestRouterComp";


/* when you dont have exact, the component with is mapped to "/" will always be shown with exact not 
  when you dont use switch, the order in with when components are listed matters. with exact "/" musst be the last one
  when componetns are in switch router weh have acces to there matched location and history via this.props 
  only components which are loaded through a route have route props. -> thats why its good to make conatainer components which are loaded by
  route and render other components. If router props are needed in component which are not used in Router components we
  can export them withRouter: export default withRouter(coponentName) in component file */
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />

      <Route path="/register" component={RegisterComponent} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/dashboard" component={DashboardComponent} />
      {/* <Route path="/testToggle" component={TestArticle} /> */}
      {/* <Route path="/test" component={TestRouterComp} /> */}


    </Switch>
  );
}

export default App;
