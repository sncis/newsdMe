import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { registerUserAction } from "../../store/actions/userActions"
import "../../css/AuthForm.css"


export class RegisterComp extends Component {
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
        <form id="registrationForm" className='auth-form'>
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="enter username"
                name="username"
                onChange={e => this.setUsername(e.target.value)}
              />
            </div>
        
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="enter Email"
                onChange={e => this.setEmail(e.target.value)}
              />
            </div>
            
            <div className="input-container">  
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                onChange={e => this.setPassword(e.target.value)}
              />
            </div>
            
            <div className="input-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={e => this.setConfirmPassword(e.target.value)}
              />
            </div>
            <button 
              id="cancelRegisterBtn"
              type="reset"
              onClick={this.submitRegistration}>Register</button>
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

const RegisterComponent = connect(mapStateToProps, mapDispatchToProps)(RegisterComp);
RegisterComponent.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  errorMsg: PropTypes.string,
  registerSuccessful: PropTypes.bool
}

export default RegisterComponent
