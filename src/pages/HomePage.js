import React from 'react'
import HomeComponent from '../components/HomeComponent'

import PageContainer from '../containers/PageContainer'

export const HomePage =({isLoggedIn}) => {
	return(
		<PageContainer onlyLogo ={false}>
			<HomeComponent />		
		</PageContainer>
	
	)
}

export default HomePage