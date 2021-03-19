import React from 'react'
import PropTypes from 'prop-types';
import "../../css/HeaderBar.css"


const HeaderBar = (props) => { 
	return(
		<div className="header-container">
			<div className="header-left">{props.left}</div>
			<div className={props.onlyLogo ? 'hidden header-middle' : "header-middle" }>{props.middle}</div> 
			<div className={props.onlyLogo ? 'hidden header-right' : "header-right" }>{props.right}</div>
		</div>
	)
}

HeaderBar.propTypes = {
	left: PropTypes.element,
	middle: PropTypes.element,
	right: PropTypes.element,
	onlyLogo: PropTypes.bool.isRequired
}

export default HeaderBar