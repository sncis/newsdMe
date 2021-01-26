import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSearch, getUserArticles } from "../store/actions/articleActions"

import ArticleList from "./ArticleList"
import SavedArticleList from './SavedArticleList';

import "../css/Dashboard.css"


export class Dashboard extends Component {

	componentDidMount(){
		this.props.loadArticles();
	}

	render(){
		return(
			<div>
				<p>Hello {this.props.userName}</p> 
				<input className="searchInput" placeholder="enter searchterm"></input>
				<button onClick={this.props.handleSearch}>search</button>
			
				<div className="articleSection">
					<ArticleList />
					<SavedArticleList />
				</div>
			</div>

		)
	}
}



const mapStateToProps = state => {
	return{
		jwtToken : state.userReducer.jwtToken,
		userName: state.userReducer.userName,
	}

};

const mapDispatchToProps = dispatch => {
	return {
		handelSearch: () => dispatch(handleSearch(this.state.searchTerm)),
		loadArticles: () => dispatch(getUserArticles())
	};
}


const DashboardComponent = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardComponent;