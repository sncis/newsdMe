import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../store/actions/userActions";

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user))
  };
};


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  setUsername = name => {
    this.setState({
      userName: name
    });
  };

  setPassword = pass => {
    this.setState({
      password: pass
    });
  };

  submitDetails = e => {
    e.preventDefault();
    try {
      this.props.loginUser(this.state);
      this.props.history.push("/test");
      console.log()
    } catch(e) {
      alert(e.message);
    }
  };

  goBack = () => {
    console.log(this.props.history);
    this.props.history.goBack();
  };

  render() {
    return (
      <form>
        <input
          placeholder="username"
          onChange={e => this.setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={e => this.setPassword(e.target.value)}
        />
        <button type="submit" onClick={this.submitDetails}>
          Login
        </button>
        <input type="button" onClick={this.goBack} value="goback" />
      </form>
    );
  }
}

const LoginComponent = connect(null, mapDispatchToProps)(Login);

export default LoginComponent;
