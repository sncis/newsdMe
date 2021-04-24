import React, { Component } from 'react';
import { connect } from "react-redux";
import {Redirect, withRouter} from 'react-router'
import PropTypes from 'prop-types';

import { registerUserAction,confirmRegistration } from "../../store/actions/userActions/registrationActions"
import { isLoadingUserSelector, getErrorMsgSelector,getRegisteredSelector,getConfirmationTokenSelector,getRegistrationSuccessSelector } from '../../store/selectors/userSelectors'
import "../../css/AuthForm.css"

import {emailValidator, passwordValidator, usernameValidator} from "../../validators/validators";

const initialState = {
  username: "",
  password: "",
  confirmPassword:"",
  email: "",
  isPasswordMatching: true,
  emailError:'',
  passwordError:'',
  usernameError:"",
  matchingError: ''
}
export class RegisterComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState
    };
  }

  handleChange = event =>{
    console.log(this.state)
    const isCheckbox = event.target.type === 'checkbox'
    this.setState({
      [event.target.name]: isCheckbox ? event.target.checked : event.target.value
    })
  }

  submitRegistration = e => {
    e.preventDefault();

    const {username, password, email} = this.state;
    const registerUser = {username,password,email}

    const isFormValid = this.validateForm()

    if(isFormValid){
      this.props.registerUser(registerUser)
      this.setState(initialState)
    }

  };

  validateForm = () => {

    let usernameError =  usernameValidator(this.state.username) ? '': 'only chars and numbers are allowed'

    let passwordError = passwordValidator(this.state.password) ? '': "invalide password"

    let emailError = emailValidator(this.state.email) ? '': "invalid email"

    let matchingError = this.state.password === this.state.confirmPassword ? '': "passwords are not matching"

    if(usernameError || passwordError || emailError){
      this.setState(({usernameError, passwordError, emailError}))
      return false
    }if(matchingError){
      this.setState({matchingError})
      return false
    }
    return true
  }

  render() {
    return (
      <div>
        <form id="registrationForm" className='auth-form' onSubmit={this.submitRegistration}>
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="enter username"
                name="username"
                value={this.state.username || ''}
                onChange={this.handleChange}
              />
              {this.state.usernameError && <div className="errorMsg">{this.state.usernameError }</div>}
            </div>

            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="enter Email"
                value={this.state.email || ''}
                onChange={this.handleChange}
              />
              {this.state.emailError && <div className="errorMsg">{this.state.emailError}</div>}

            </div>
            
            <div className="input-container password-container">
              <label htmlFor="password">Password</label>
              <div>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password || ''}
                    onChange={this.handleChange}
                />
                <div className="passwordInfo"><p>Use 8 or more characters with a mix of letters, numbers & symbols</p>

                </div>

              </div>

            {this.state.passwordError && <div className="errorMsg">{this.state.passwordError}</div>}
            </div>

            
            <div className="input-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={this.state.confirmPassword || ''}
                onChange={this.handleChange}
              />
            </div>
            <button 
              id="submit-btn"
              type="submit"
              >Register</button>
        </form>

        {this.state.matchingError && <div id="passwordMatchingError"><p>{this.state.matchingError}</p></div>}
        {this.props.registrationErrorMsg && <div><p id="#registrationErrorMsg">{this.props.registrationErrorMsg}</p></div>}
        {this.props.confirmationToken && <div onClick={() => this.props.confirmRegistration(this.props.confirmationToken)}><p>click here to confirm registration </p><
          p>{this.props.confirmationToken}</p></div>}

        {this.props.isRegistrationSuccess && <Redirect to="/confirm/1" />}


      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		registerUser: user => { dispatch(registerUserAction(user)) },
    confirmRegistration : (token) =>{dispatch(confirmRegistration(token))}
	}
}


const mapStateToProps = state => {
  return{
    isLoading: isLoadingUserSelector(state),
    registrationErrorMsg : getErrorMsgSelector(state),
    registerSuccessful: getRegisteredSelector(state),
    confirmationToken : getConfirmationTokenSelector(state),
    isRegistrationSuccess: getRegistrationSuccessSelector(state),

  }
}

const RegisterComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterComp));

RegisterComponent.propTypes = {
  registerUser: PropTypes.func,
  isLoading: PropTypes.bool,
  registrationErrorMsg: PropTypes.string,
  isRegistrationSuccess: PropTypes.bool
}

export default RegisterComponent
