import React from 'react'
import PropTypes from 'prop-types';
// import { withRouter, Route, Switch } from 'react-router-dom'

import AuthDialogContainer from '../containers/AuthDialogContainer'

import LoginComponent from "../components/Auth/LoginComponent"
import RegisterComponent from "../components/Auth/RegisterComponent"
import HeaderBarContainer from '../containers/HeaderBarContainer'
import PageContainer from '../containers/PageContainer';

export class AuthPage extends React.Component {

	constructor(props){
		super(props)
		this.state={
			index: 1
		}

	}

	componentWillMount(){
		this.setState({
			index: parseInt(this.props.match.params.index)
		})
	}

	toggleAuth = (index) => {
		this.setState({
			index: index
		})
	}

	render(){
		return(
			<PageContainer onlyLogo={true}>
					{this.state.index === 1 && 	
						<AuthDialogContainer title="Login"	>
							<div className="auth-headline"><p>Don't have an Account yet? <span id='registerLink' onClick={()=>this.toggleAuth(2)}>Register</span></p></div>
							<LoginComponent />
						</AuthDialogContainer>	
					}
					{
					this.state.index === 2 && 	
					<AuthDialogContainer title="Register"	>
						<div className="auth-headline"><p>Already have an Account? <span id='loginLink' onClick={()=>this.toggleAuth(1)}>Login</span></p></div>
						<RegisterComponent />
					</AuthDialogContainer>
					}
			</PageContainer>
     
		
		)
	}
	
}

AuthPage.propTypes = {
	match: PropTypes.shape({
		params:PropTypes.shape({index: PropTypes.string.isRequired})
	})
}

export default AuthPage