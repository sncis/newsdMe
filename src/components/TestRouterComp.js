import React, { Component } from "react";
import { connect } from "react-redux";

import { Route } from "react-router-dom";
import store from "../store/store/store";

import ContactData from "../containers/ContactData/ContactData";

const mapStateToProps = state => ({
  user: state.user
});

export class TestRouterComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        red: 1,
        green: 1
      }
    };
  }

  handleClick = () => {
    const queryParmas = [];
    for (let i in this.state.ingredients) {
      //for encoding intu url element
      queryParmas.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const queryString = queryParmas.join("&");
    this.props.history.push({
      pathname: "/login",
      search: "?" + queryString
    });
  };

  contactForm = () => {
    this.props.history.replace("/test/contact-data");
    console.log("*********this is state from store*******");
    console.log(store.getState());
    // console.log(this.props);
  };

  render() {
    return (
      <div>
        <input type="button" onClick={this.handleClick} value="go to login" />
        <input
          type="button"
          onClick={this.contactForm}
          value="go to contact form"
        />

        {/* instead of passing a component in the Route object we can pass a render method 
        to pass some props from the test component  */}
        <Route
          path={this.props.match.path + "/contact-data"}
          // component={ContactData}
          render={props => (
            <ContactData ingr={this.state.ingredients} {...props} />
          )}
        />
      </div>
    );
  }
}

const TestComponent = connect(mapStateToProps, null)(TestRouterComp);
export default TestComponent;
