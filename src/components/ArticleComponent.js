import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BookmarkIcon, BookmarkFillIcon} from '@primer/octicons-react'
import { withRouter } from 'react-router-dom'

import { saveUserArticle, removeUserArticle } from "../store/actions/articleActions"

import "../css/Article.css";

import dummy from "../assets/img/dummy.jpg";

export class ArticleComp extends Component {

	toogleIsBoomarked = (article) => {
		if(this.props.isLoggedIn){
			if(!article.isBookmarked){
				article['isBookmarked'] = true;

				this.props.saveUserArticle(article)
			}else{
				article['isBookmarked'] = false;
				this.props.removeUserArticle(article)
			}
			// !article.isBookmarked ? this.props.storeArticle(article) : this.props.removeArticle(article)
		}else {
			this.props.history.push('/login')
		}
		// console.log(article.isBookmarked )

	}
	
	render(){
		// console.log(this.props.article)
		let source = this.props.article.source.name === undefined ? this.props.article.source : this.props.article.source.name;
		// console.log(source)
		return(
			<div className="container">
				<div className="" key={this.props.article.id}>
					<a className="link-to-article" href={this.props.article.url} target='blank'>
						<div className="thumbnail">
							<img src={dummy} alt="article thumbnail" />
						</div>
						<h3 className ="title">{this.props.article.title}</h3>
						<p className="description">{this.props.article.description}</p>
					</a>
					<a href={source} target="blank">
						<p className="source">{source}</p>
					</a>
					<div className="bookmark-container" onClick={() => this.toogleIsBoomarked(this.props.article)}>
						{ !this.props.article.isBookmarked && <BookmarkIcon size={16} className="bookMark" /> }
						{ this.props.article.isBookmarked && <BookmarkFillIcon size={16} className="bookMark" /> }
					</div>
				</div>
			</div>
		)
	}
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

const ArticleComponent = connect(mapStateToProps, mapDispatchToProps)(ArticleComp)
export default withRouter(ArticleComponent);