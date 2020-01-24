import React from "react";
import axios from "axios";

export default class Login extends React.Component {
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

    console.log(this.state);
    const url = "http://localhost:8080/login";
    axios
      .post(url, this.state)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
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
      </form>
    );
  }
}
