import React from 'react'
import { Route, Redirect } from "react-router-dom"


//passing different props to the Protected route so that we can usi ti for different reoutes
//which we wanna protect
// rest are the rest of the propes which can be passed 
//render needs props therfore we are passing them to it 
//you ahve to pass a pathname to the redirect and a state so that it knows from where it comes from 

function ProtectedRoute({isLoggedIn: loggedIn, isAuthorised, redirectPath : path, component: Component, ...rest }){
	return (
		<Route {...rest} render={(props) => {
			// {rest.forEach(el => console.log(el))}
		console.log(isAuthorised)
			if(loggedIn && isAuthorised) {
				return <Component />
			}else {

				return <Redirect to={{ pathname :path , state: {from : props.location }}} />
			}
		}} />

	);
}


export default ProtectedRoute