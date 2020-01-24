import React from "react";
import axios from "axios";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      email: "",
      active: true
    };
  }

  setUserName = name => {
    this.setState({
      userName: name
    });
  };

  setPassword = pass => {
    this.setState({
      password: pass
    });
  };

  setEmail = mail => {
    this.setState({
      email: mail
    });
  };

  submitDetails = e => {
    e.preventDefault(); // for not reloading the page after submit
    console.log(this.state);
    const url = "http://localhost:8080/register";
    axios
      .post(url, this.state)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <form>
        <div>
          <input
            type="email"
            placeholder="email"
            onChange={e => this.setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="username"
            onChange={e => this.setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={e => this.setPassword(e.target.value)}
          />
          <input type="submit" onClick={this.submitDetails} />
        </div>
      </form>
    );
  }
}
