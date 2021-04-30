import React from 'react'
import { Link } from 'react-router-dom'
import HomeComponent from '../components/HomeComponent'
import PageContainer from '../containers/PageContainer'

export const HomePage =() => {
	return(
		<PageContainer onlyLogo ={false}>
			<Link to="/dashboard">Dashboard</Link>
			<HomeComponent />		
		</PageContainer>
	)
}


export default HomePage


