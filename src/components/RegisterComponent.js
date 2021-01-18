import React, { Component } from 'react';
import { connect } from "react-redux";

import { registerUserAction } from "../store/actions/userActions"

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword:"",
      email: "",
      isPasswordMatching:true,
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

  setConfirmPassword = confPassword => {
    this.setState({
      confirmPassword: confPassword
    })
  }

  setEmail = mail => {
    this.setState({
      email: mail
    });
  };

  submitRegistration = e => {
    e.preventDefault(); 

    const {userName, password, email} = this.state;
    const registerUser = {
      userName,
      password,
      email
    }
    this.state.confirmPassword === this.state.password ? 
    this.props.registerUser(registerUser) : 
    this.setState({
      isPasswordMatching : false
    });
    setTimeout(() =>{
      this.props.registerSuccessful ? this.props.history.push("/dashboard") : this.props.history.push("/home")
    }, 2000)

  };

  cancelRegistration = (e) => { 
    e.preventDefault()
    this.setState({
      userName: "",
      password: "",
      confirmPassword:'',
      email: "",
      isPasswordMatching:true,
    })
    document.getElementById("registrationForm").reset();
      }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form id="registrationForm">
          <div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="enter username"
                name="username"
                id="username"
                onChange={e => this.setUsername(e.target.value)}
              />
            </div>
        
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="enter Email"
                onChange={e => this.setEmail(e.target.value)}
              />
            </div>
            
            <div> 
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={e => this.setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={e => this.setConfirmPassword(e.target.value)}
              />
            </div>
            

            <button
              id="SubmitRegisterBtn"
              type="submit"
              onClick={this.cancelRegistration}>Cancel</button>
            
            <button
              id="cancelRegisterBtn"
              type="reset"
              onClick={this.submitRegistration}>Register</button>
          </div>
        </form>

        {!this.state.isPasswordMatching  && <div id="passwordMatchingError"><p>password is not matching</p></div>}
        {this.props.isLoading && <div><p id="loadingMsg">state from reducx is loading </p></div>}
        {this.props.errorMsg && <div><p id="errorMsg">{this.props.errorMsg}</p></div>}

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		registerUser: user => { dispatch(registerUserAction(user)) }
	}
}


const mapStateToProps = state => {
  return{
    isLoading: state.userReducer.isLoading,
    errorMsg : state.userReducer.errorMsg,
    registerSuccessful: state.userReducer.registerSuccessful
  }
}

const RegisterComponent = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterComponent;