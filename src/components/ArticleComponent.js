import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BookmarkIcon, BookmarkFillIcon} from '@primer/octicons-react'

import { saveUserArticle, removeUserArticle } from "../store/actions/articleActions"

import "../css/Article.css";

import dummy from "../assets/img/dummy.jpg";

export class ArticleComp extends Component {

	toogleIsBoomarked = (article) => {
		console.log(article.isBookmarked )
		!article.isBookmarked ? this.props.storeArticle(article) : this.props.removeArticle(article)

	}
	render(){
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
					<a href={this.props.article.source.name} target="blank">
						<p className="source">{this.props.article.source.name}</p>
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

// const mapStateToProps = state =>{
// 	return{
// 		jwtToken: state.userReducer.jwtToken,
// 		usernam: state.userReducer.userName
// 	}
// }

const mapDispatchToProps = (dispatch) =>{
	return{
		storeArticle: article => {dispatch(saveUserArticle(article))},
		removeArticle: article => {dispatch(removeUserArticle(article))}
	}	
}

const ArticleComponent = connect(null, mapDispatchToProps)(ArticleComp)
export default ArticleComponent;