import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {BookmarkFillIcon, BookmarkIcon} from '@primer/octicons-react'
import "../css/SavedArticle.css";
import "../css/Article.css";


import dummy from "../assets/img/dummy.jpg";

import { saveUserArticle, removeUserArticle } from "../store/actions/articleActions"


export class Article extends React.Component {
	toogleIsBoomarked = (article) => {
		if(this.props.isLoggedIn){
			if(!article.isBookmarked){
				article['isBookmarked'] = true;

				this.props.saveUserArticle(article)
			}else{
				article['isBookmarked'] = false;
				this.props.removeUserArticle(article)
			}
		}else {
			this.props.history.push('/login')
		}
	}

	render(){
		let source = this.props.article.source.name !== undefined ? this.props.article.source.name : this.props.article.source;
		return(
			<div className={`${this.props.articleType}_container`}>
					
					<a className={`${this.props.articleType}_link-to-article`} href={this.props.article.url} target='blank'>
						
						<div className={`${this.props.articleType}_thumbnail`}>
							<img src={dummy} alt="article thumbnail" />
						</div>

						<h3 className ={`${this.props.articleType}_title`}>{this.props.article.title}</h3>
						<p className={`${this.props.articleType}_description`}>{this.props.article.description}</p>
					</a>


					<a href={source} target="blank">
						<p className={`${this.props.articleType}_source`}>{source}</p>
					</a>


					<div className={`${this.props.articleType}_bookmark-container`} onClick={() => this.toogleIsBoomarked(this.props.article)}>
						{ !this.props.article.isBookmarked && <BookmarkIcon size={16} className={`${this.props.articleType}_bookMark`} /> }
						{ this.props.article.isBookmarked && <BookmarkFillIcon size={16} className={`${this.props.articleType}_bookMark`} /> }
					</div>
			</div>
		)
	}
}

Article.propTypes = {
	articleType: PropTypes.string.isRequired, 
	article: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		description: PropTypes.string,
		url: PropTypes.string,
		source : PropTypes.any,
		isBookmarked: PropTypes.bool,

	}),
	removeUserArticle: PropTypes.func,
	saveUserArticle: PropTypes.func,
	// history: {push: PropTypes.func},
	isLoggedIn: PropTypes.bool
}

const mapStateToProps = state =>{
	return{
		isLoggedIn: state.userReducer.loggedIn,
		// usernam: state.userReducer.userName
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
		saveUserArticle: article => {dispatch(saveUserArticle(article))},
		removeUserArticle: article => {dispatch(removeUserArticle(article))}
	}	
}


const ArticleComponent = connect(mapStateToProps, mapDispatchToProps)(Article)
export default withRouter(ArticleComponent);

// const SavedArticleComponent = connect(null, mapDispatchToProps)(SavedArticleComponentItem)

// export default SavedArticleComponent;
// export default class Article extends React.Component{
// 	constructor(props){
// 		super(props)
// 	}
// 	removeArticle = (article) => {
// 		// article['isBookmarked'] = false
// 		// this.props.removeArticle(article)
// 		console.log("clicked")
// 	}
// 	render(){
// 		return(
// 			<div className={this.articleType}>
// 				{/* <div className="" key={this.props.article.id}> */}
			
// 				<div className="saved_thumbnail">
// 					<img src={dummy} alt="article thumbnail" />
// 				</div>

// 				<div className="text-container">
// 					<a className="saved_link-to-article" href={this.props.article.url} target='blank'>	
// 					<h3 className ="saved_title">{this.props.article.title}</h3></a>
// 					<p className="saved_description">{this.props.article.description}</p>	
// 					<a className="saved_source" href={this.props.article.source} target='blank'>
// 					<p>{this.props.article.source}</p>
// 				</a>
// 				</div>
// 				<div className="saved_bookmark-container" onClick={() => this.removeArticle(this.props.article)}>
// 					<BookmarkFillIcon size={16} className="saved_bookMark" /> 
// 				</div>
// 				{/* </div> */}
// 			</div>
			
// 		)
// 	}
// }

// Article.propTypes = {
// 	articleType: PropTypes.string
// }


// <div className={this.props.articleType}> 
// 					{/* <div className="saved_container"> */}
// 					{/* <div className="" key={this.props.article.id}> */}
// 					 <div className={`${this.props.articleType}_thumbnail`}>
// 						<img src={this.props.thumbnail} alt="article thumbnail" />
// 					</div>
	
// 					<div className="text-container">
// 						{/* <a className={`${this.props.articleType}_url`} href={this.props.url} target='blank'>	 
// 						<h3 className ="saved_title">{this.props.title}</h3></a>*/}
// 						<p className="saved_description">{this.props.description}</p>	
// 						<a className="saved_source" href={this.props.source} target='blank'>
// 						<p>{this.props.source}</p>
// 					</a>
// 					</div>{/*
// 					<div className="saved_bookmark-container" onClick={() => this.removeArticle(this.props.article)}>
// 						{this.props.articleType === "saved" ? <BookmarkFillIcon size={16} className="saved_bookMark" /> :  <BookmarkIcon size={16} className="bookMark" />  }
// 					</div> */}
// 					{/* </div> */}
// 				{/* </div> */}
// 			</div>