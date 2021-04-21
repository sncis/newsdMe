import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { registerUserAction,confirmRegistration } from "../../store/actions/userActions/registrationActions"
import { isLoadingUserSelector, getErrorMsgSelector,getRegisterSuccessfulSelector,getConfirmationTokenSelector } from '../../store/selectors/userSelectors'
import "../../css/AuthForm.css"


export class RegisterComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword:"",
      email: "",
      isPasswordMatching:true,
      isPasswordValid: true,
    };
  }
  
  setUsername = name => {
    this.setState({
      username: name
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

    const {username, password, email} = this.state;
    const registerUser = {
      username,
      password,
      email
    }
    this.checkPassword(this.state.password)


    this.state.confirmPassword === this.state.password ? 
    this.props.registerUser(registerUser) : 
    this.setState({
      isPasswordMatching : false
    });

    setTimeout(() =>{
      console.log(this.state.isPasswordValid)

      // this.props.registerSuccessful ? this.props.history.push("/dashboard") : this.props.history.push("/home")
    }, 2000)

  };

  checkPassword = (password) => {
    this.setState({
      isPasswordValid: !!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    })
    // return !!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
  }

  cancelRegistration = (e) => { 
    e.preventDefault()
    this.setState({
      username: "",
      password: "",
      confirmPassword:'',
      email: "",
      isPasswordMatching: true,
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
               {/* {!this.state.isPasswordValid  && <p id="passwordValidError">password must contain at least 1 Uppercase, 1 lowercase, 1 special characther and 1 number</p>} */}

            </div>
            {!this.state.isPasswordValid  && <p id="passwordValidError">password must contain at least 1 Uppercase, 1 lowercase, 1 special characther and 1 number</p>}

            
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
        {this.props.confirmationToken && <div onClick={() => this.props.confirmRegistration(this.props.confirmationToken)}><p>click here to confirm registration </p><
          p>{this.props.confirmationToken}</p></div>}


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
    errorMsg : getErrorMsgSelector(state),
    registerSuccessful: getRegisterSuccessfulSelector(state),
    confirmationToken : getConfirmationTokenSelector(state)
  }
}

const RegisterComponent = connect(mapStateToProps, mapDispatchToProps)(RegisterComp);

RegisterComponent.propTypes = {
  registerUser: PropTypes.func,
  isLoading: PropTypes.bool,
  errorMsg: PropTypes.string,
  registerSuccessful: PropTypes.bool
}

export default RegisterComponent
