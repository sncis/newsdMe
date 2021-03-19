import React from 'react'
import DashboardComponent from '../components/DashboardComponent'

import PageContainer from '../containers/PageContainer'

export const DashboardPage =({isLoggedIn}) => {
	return(
		<PageContainer onlyLogo ={false}>
			<DashboardComponent />		
		</PageContainer>
	
	)
}

export default DashboardPage