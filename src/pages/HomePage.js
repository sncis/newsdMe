import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import HomeComponent from '../components/HomeComponent'
import PageContainer from '../containers/PageContainer'
import {getBackendBackendErrorMsgSelector} from "../store/selectors/backendDataSelector";

export const HomePage =({backendErrorMsg}) => {
	return(
		<PageContainer onlyLogo ={false}>
			<Link to="/dashboard">Dashboard</Link>
			{backendErrorMsg && <p>{backendErrorMsg}</p>}

			<HomeComponent />		
		</PageContainer>
	
	)
}

const mapStateToProps = state =>{
	return {
		backendErrorMsg: () => getBackendBackendErrorMsgSelector(state)
	}
}

export default connect(mapStateToProps,null)(HomePage)