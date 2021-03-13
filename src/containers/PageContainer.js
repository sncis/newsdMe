import React from 'react'
import PropTypes from 'prop-types';

import HeaderBarContainer from './HeaderBarContainer'

const PageContainer = (props) => {
	return(
		<div>
			<HeaderBarContainer onlyLogo={props.onlyLogo} />
			{props.children}
		</div>
	)
}

PageContainer.propTypes ={
	onlyLogo: PropTypes.bool,
	children: PropTypes.any
}

export default PageContainer