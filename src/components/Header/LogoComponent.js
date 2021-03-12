import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import "../../css/LogoComponent.css"

export const LogoComponent = (props) =>{
	return(
		<Link to={props.link} className="newsd-logo">newsd</Link>
	)
}

LogoComponent.propTypes = {
	link: PropTypes.string
}

export default LogoComponent