import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux"

import { logoutAction } from "../../store/actions/userActions"
import PropTypes from 'prop-types';


export const HeaderAuth =(props)=> {
	return(
		<div>
			{
				!props.isLoggedIn &&
				<div>
					<Link to="/auth/1" className="login">
						<button className="login-btn">Login</button>
					</Link>

					<Link to="/auth/2" className="register">
						<button className="login-btn">Register</button>
					</Link>
				</div>
			}
			{
				props.isLoggedIn &&
				<button className="logout-btn" onClick={() => props.logout()}>Logout</button> 
			}
		</div>
	)	
}

const mapStateToProps = state =>  {
	return { 
		isLoggedIn: state.userReducer.loggedIn
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logoutAction())
	}
}


const HeaderAuthComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderAuth)


HeaderAuthComponent.propTypes ={
	isLoggedIn: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
}

export default HeaderAuthComponent