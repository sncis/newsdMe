import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import x from "../assets/img/x.svg";

import "../css/AuthDialogContainer.css"

export const AuthDialogContainer =(props)=>{
	return(
		<div className="auth-dialog"> 
		<Link to="/" className="back-x">
			<img src={x} alt="back to home" />
		</Link>
			<p className="auth-title">{props.title}</p>
			<div className="auth-content">
				{props.children}
			</div>
		</div>		
	)
}

AuthDialogContainer.propTypes ={
	title: PropTypes.string.isRequired,
	children: PropTypes.any
}

export default AuthDialogContainer