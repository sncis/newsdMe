import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import { loginUserAction } from "../../store/actions/userActions"
import * as selectors from '../../store/selectors/userSelectors'
import "../../css/AuthForm.css"

export class LoginComp extends Component {
	constructor(props){
		super(props)
		this.state = {
		userName: '',
		password: ''
	}}

	setUsername = (username) => {
		this.setState({
			userName: username,
		})
	}

	setPassword = (password) => {
		this.setState({
			password:password
		})
	}

	handelLogin = (e)=> {
		e.preventDefault();
		this.props.loginUser(this.state);
	}

	render() {
		return(
			<div> 
				{this.props.isLoggedIn && <Redirect to='/dashboard'/>}
				<form className='auth-form'>
					<div className="input-container">
						<label htmlFor="username">Username</label>
						<input placeholder="enter username" name="username" id ="username" onChange={event => this.setUsername(event.target.value)} />
					</div>

					<div className="input-container">
						<label htmlFor="password">Password</label>
						<input placeholder="enter password" name="password" id="password" onChange={event => this.setPassword(event.target.value)} />
					</div>
				
					<button type="submit" onClick={this.handelLogin}>Login</button>
				</form>
				{this.props.isLoading && <div><p id="loadingMsg">Loading </p></div>}
        {this.props.errorMsg && <div><p id="errorMsg">{this.props.errorMsg}</p></div>}

			</div>
		)
	}


}
const mapDispatchToProps = (dispatch) => {
	return {
	loginUser: user =>  {dispatch(loginUserAction(user)) }
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