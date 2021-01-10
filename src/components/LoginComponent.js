import React, { Component } from 'react';
import { connect } from "react-redux";

import { loginUserAction } from "../store/actions/userActions"
import store from "../store/store/store"

export class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
		username: '',
		password: ''
	}}

	setUsername = (username) => {
		this.setState({
			username: username,
		})
	}

	setPassword = (password) => {
		this.setState({
			password:password
		})
	}

	handelLogin = (e)=> {
		e.preventDefault();
		this.props.loginUser(this.state)
		setTimeout(()=> {
			console.log("login componeent timeout after login click")
			console.log(store.getState())

		},200)
		// console.log(this.props);

	}

	render() {
		return(
			<div> 
				<h1>Login</h1>
				<form>
					<div>
					<label htmlFor="username">Username</label>
					<input placeholder="enter username" name="username" id ="username" onChange={event => this.setUsername(event.target.value)} />
					</div>

					<div>
					<label htmlFor="password">Password</label>
					<input placeholder="enter password" name="password" id="password" onChange={event => this.setPassword(event.target.value)} />
					</div>
				
				
					<button type="submit" onClick={this.handelLogin}>Login</button>
				</form>
			</div>
		)
	}


}
const mapDispatchToProps = (dispatch) => {
	return {
		loginUser: user => { dispatch(loginUserAction(user)) }

		// loginUser: user => { dispatch({type:LOGIN_USER_LOADING, payload: user}) }
	}
}

// const mapStateToProps = (state, ownProps) => {
// 	return {
// 		userName: state.userName,
// 		jwtToken: state.jwtToken
// 	}
// }

const LoginComponent = connect(null, mapDispatchToProps)(Login);

export default LoginComponent;