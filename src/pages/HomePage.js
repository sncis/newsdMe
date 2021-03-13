import React from 'react'
import { connect } from 'react-redux'
import PageContainer from '../containers/PageContainer'
import Home from "../components/Home"


export const HomePage =({isLoggedIn}) => {
	return(
		<PageContainer onlyLogo={false}>
			<Home />
		</PageContainer>
	
	)
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.userReducer.loggedIn
  }
}



export default connect(mapStateToProps,null)(HomePage)