import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import { loginUserAction } from "../../store/actions/userActions/loginActions"
import * as selectors from '../../store/selectors/userSelectors'
import "../../css/AuthForm.css"
import {passwordValidator, usernameValidator} from "../../validators/validators";

export class LoginComp extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
			validationError:'',
	}}


	handleChange = event =>{
		const isCheckbox = event.target.type === 'checkbox'
		this.setState({
			[event.target.name]: isCheckbox ? event.target.checked : event.target.value
		})
	}

	validateForm = ()=>{
		if(!usernameValidator(this.state.username) || !passwordValidator(this.state.password)){
			this.setState({
				validationError: "please provide valid input"
			})
			return false
		}
		return true
	}

	handelLogin = (e)=> {
		e.preventDefault()
		let isValid = this.validateForm()
		if(isValid){
			this.setState({
				validationError: ""
			})
			const {username, password } = this.state
			const loginUser = {username, password}
			this.props.loginUser(loginUser);

		}
	}

	render() {
		return(
			<div> 
				{this.props.isLoggedIn && <Redirect to='/dashboard'/>}
				<form className='auth-form' onSubmit={this.handelLogin}>
					<div className="input-container">
						<label htmlFor="username">Username</label>
						<input placeholder="enter username" name="username" id ="username" value={this.state.username} onChange={this.handleChange} />
					</div>

					<div className="input-container">
						<label htmlFor="password">Password</label>
						<input type="password" placeholder="enter password" name="password" id="password" value ={this.state.password} onChange={this.handleChange} />
					</div>
					{this.state.validationError && <div className="validationError">{this.state.validationError}</div>}
					<button type="submit" data-cy='login-btn'>Login</button>
				</form>
				{this.props.isLoading && <div><p id="loadingMsg">Loading...!</p></div>}
        {this.props.errorMsg && <div><p id="errorMsg">{this.props.errorMsg}</p></div>}

			</div>
		)
	}


}
const mapDispatchToProps = (dispatch) => {
	return {
		loginUser: user =>  {dispatch(loginUserAction(user))},
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: selectors.isLoadingUserSelector(state),
		errorMsg: selectors.getErrorMsgSelector(state),
		loginSuccessful : selectors.getLoginSuccesfulSelector(state),
		isLoggedIn : selectors.getUserLoginSelector(state)
	}
}

const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(LoginComp);

LoginComponent.propTypes = {
	loginUser: PropTypes.func,
	isLoading: PropTypes.bool,
	errorMsg: PropTypes.string,
	loginSuccessful : PropTypes.bool,
	isLoggedIn: PropTypes.bool
}

export default LoginComponent