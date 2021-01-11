import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getUserInfos } from '../store/actions/userActions';
import store from "../store/store/store";



const mapStateToProps = state => {
	return{
		jwtToken : state.jwtToken,
		userName: state.userName,
		articles: state.articles
	}

};

const mapDispatchToProps = dispatch => {
	return {
		// getUserInfos: () => dispatch(getUserInfos()),
	};
}


export class Dashboard extends Component {
	constructor(props) {
    super(props);
    this.state = {
      someArticles: []
    };
	}

	componentDidMount = () => {
		this.props.getUserInfos();

	}
	
	handle = () => {
		console.log("gettest clicked")
		this.props.getTest();
	}
	


	render(){
		return(
			<div>
				<p>{this.props.jwtToken}</p>
				<input type="button" onClick={this.props.getUserInfos} value="show articles"></input>

				<div><p>returned user Infos</p></div>

				{this.props.articles.map(article =>
					<div key={article.id}> 
						<p>{article.title}</p>
						<p>{article.discription}</p>
					</div>)}
				
				{/* <input type="button" value="show article" onClick={this.handle}></input> */}

			</div>

		)
	}
}


const DashboardComponent = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardComponent;