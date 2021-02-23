import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserArticles } from "../store/actions/articleActions"
import { handleSearch, loadDailyArticles } from '../store/actions/newsApiActions'
import { withRouter } from 'react-router-dom' // turne it into a ompoene twith acces to the routes
import ArticleList from "./ArticleList"
import SavedArticleList from './SavedArticleList';

import "../css/Dashboard.css"


export class Dashboard extends Component {
	constructor(props){
		super(props)
		this.state = {
		searchTerm: '',
	}}

	componentDidMount(){
		this.props.loadArticles();
		this.props.loadDailyArticles()	
	}

	handelSearch(){
		console.log(this.state.searchTerm)
	}
	render(){
		return(
			<div>
				<p>Hello {this.props.userName}</p> 
				<input className="searchInput" placeholder="enter searchterm" onChange={(e) => this.setState({searchTerm: e.target.value})}></input>
				<button onClick={()=>this.handelSearch()}>search</button>
			<div>
				<p>search terme</p>
				<p>{this.state.searchTerm}</p>
			</div>
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
		// handelSearch: () => {dispatch(handleSearch())},
		loadArticles: () => {dispatch(getUserArticles())},
		loadDailyArticles: () => {dispatch(loadDailyArticles())}
	};
}


const DashboardComponent = connect(null, mapDispatchToProps)(Dashboard);

export default withRouter(DashboardComponent);