import React, { Component } from 'react'
import { connect } from "react-redux"

import { Link } from "react-router-dom";

export class NavBarComponent extends Component {
	render(){
		return(
			<div>
				{
					!this.props.isLoggedIn &&
					<div>
						<Link to="/register" className="registerLink">register</Link>
						<Link to="/login" className="loginLink">login</Link>
					</div>
					
				}
			
				{this.props.isLoggedIn && 
				<div>	
					<p>logout</p> 
					<Link to="/home" className="homeLink">Home</Link>
					<Link to="/dashboard" className="dashboardLink">Dashboard</Link>
				</div>
			}

			</div>
		)
	}
}

const mapStateToProps = state =>  {
	return{ 
		isLoggedIn: state.userReducer.loggedIn

	}
}


const NavBar = connect(mapStateToProps, null)(NavBarComponent)

export default NavBar