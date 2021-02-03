import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserArticles } from "../store/actions/articleActions"
import { handleSearch, loadDailyArticles } from '../store/actions/newsApiActions'

import ArticleList from "./ArticleList"
import SavedArticleList from './SavedArticleList';

import "../css/Dashboard.css"


export class Dashboard extends Component {

	componentDidMount(){
		this.props.loadArticles();
		this.props.loadDailyArticles()	
	}

	render(){
		return(
			<div>
				<p>Hello {this.props.userName}</p> 
				<input className="searchInput" placeholder="enter searchterm"></input>
				<button onClick={this.props.handleSearch}>search</button>
			
				<div className="articleSection">
					<ArticleList articles={this.articles}/>
					<SavedArticleList />
				</div>
			</div>

		)
	}
}




const mapDispatchToProps = dispatch => {
	return {
		handelSearch: () => dispatch(handleSearch(this.state.searchTerm)),
		loadArticles: () => dispatch(getUserArticles()),
		loadDailyArticles: () => dispatch(loadDailyArticles())
	};
}


const DashboardComponent = connect(null, mapDispatchToProps)(Dashboard);

export default DashboardComponent;