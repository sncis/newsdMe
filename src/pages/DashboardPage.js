import React from 'react'

import PageContainer from '../containers/PageContainer'

export const DashboardPage =({isLoggedIn}) => {
	return(
		<PageContainer onlyLogo ={false}>
			<div>I'm the dashboard page'</div>		
		</PageContainer>
	
	)
}

export default DashboardPage