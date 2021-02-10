import React, { Component } from 'react'
import { connect } from "react-redux"

import { Link } from "react-router-dom";

import { logoutAction } from "../store/actions/userActions"

export class NavBarComponent extends Component {

	render(){
		return(
			<div>
				{
					!this.props.isLoggedIn &&
					<div>
						<Link to="/home" className="homeLink">Home</Link>
						<Link to="/register" className="registerLink">register</Link>
						<Link to="/login" className="loginLink">Login</Link>
					</div>
					
				}
			
				{this.props.isLoggedIn && 
				<div>	
					<button className="logout-btn" onClick={() => this.props.logout()}>Logout</button> 
					<Link to="/home" className="homeLink">Home</Link>
					<Link to="/dashboard" className="dashboardLink">Dashboard</Link>
				</div>
			}

			</div>
		)
	}
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


const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarComponent)

export default NavBar