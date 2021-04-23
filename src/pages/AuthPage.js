import React from 'react'
import PropTypes from 'prop-types';
import AuthDialogContainer from '../containers/AuthDialogContainer'

import LoginComponent from "../components/Auth/LoginComponent"
import RegisterComponent from "../components/Auth/RegisterComponent"
import ConfirmationComponent from '../components/Auth/ConfirmationComponent'
import PageContainer from '../containers/PageContainer';

export class AuthPage extends React.Component {

	constructor(props){
		super(props)
		this.state={
			index: 1
		}

	}

	componentDidMount(){
		this.setState({
			index: parseInt(this.props.match.params.index),
			token: this.props.match.params.token ? parseInt(this.props.match.params.token):''
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

					{this.state.index === 3 &&
					<AuthDialogContainer title="ConfirmRegistration">
							<div className="auth-headline"><p>Resent confirmation Token? <span id='loginLink'>click here</span></p></div>
							<ConfirmationComponent />
						</AuthDialogContainer>
					}
			</PageContainer>
     
		
		)
	}
	
}

AuthPage.propTypes = {
	match: PropTypes.shape({
		params:PropTypes.shape({index: PropTypes.string})
	})
}

export default AuthPage