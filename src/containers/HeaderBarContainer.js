import React from 'react'
import PropTypes from 'prop-types';

import SearchComponent from '../components/Header/SearchComponent'
import HeaderBar from '../components/Header/HeaderBar'
import LogoComponent from '../components/Header/LogoComponent'
import HeaderAuthComponent from '../components/Header/HeaderAuthComponent'


const HeaderBarContainer = ({onlyLogo}) => {
	return(
		<HeaderBar left={<LogoComponent link='/'/>} middle={<SearchComponent />} right={<HeaderAuthComponent />} onlyLogo={onlyLogo} />
	)
}

HeaderBarContainer.propTypes ={
	onlyLogo: PropTypes.bool
}

export default HeaderBarContainer