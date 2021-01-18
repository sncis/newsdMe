import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from "../store/store/store";
import { handleSearch, getUserArticelsSuccessfull } from "../store/actions/articleActions"

import ArticleList from "./ArticleList"


export class Dashboard extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
				<p>Hello {this.props.userName}</p> 
				<input className="searchInput" placeholder="enter searchterm"></input>
				<button onClick={this.props.handleSearch}>search</button>
			
				<ArticleList />	
			</div>

		)
	}
}



const mapStateToProps = state => {
	return{
		jwtToken : state.userReducer.jwtToken,
		userName: state.userReducer.userName,
		articles: state.articleReducer.articles
	}

};

const mapDispatchToProps = dispatch => {
	return {
		handelSearch: () => dispatch(handleSearch(this.state.searchTerm)),
		// getUserArticelsSuccessfull : () => dispatch(getUserArticelsSuccessfull(store.getState().articleReducer.articles))
	};
}


const DashboardComponent = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardComponent;