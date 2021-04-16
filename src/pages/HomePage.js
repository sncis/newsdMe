import React from 'react'
import HomeComponent from '../components/HomeComponent'
import store from "../store/store/store"
import PageContainer from '../containers/PageContainer'

export const HomePage =({isLoggedIn}) => {
	console.log("store data in home page ")
	console.log(store.getState())
	return(
		<PageContainer onlyLogo ={false}>
			<HomeComponent />		
		</PageContainer>
	
	)
}

export default HomePage