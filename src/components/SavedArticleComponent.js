import React, {Component} from 'react';
import { connect } from 'react-redux'
import dummy from "../assets/img/dummy.jpg";
import {BookmarkFillIcon} from '@primer/octicons-react'

import {removeUserArticle} from "../store/actions/articleActions"
import "../css/SavedArticle.css";



export class SavedArticleComponentItem extends Component {
	render(){
		return(
			<div className="saved_container">
				{/* <div className="" key={this.props.article.id}> */}
			
				<div className="saved_thumbnail">
					<img src={dummy} alt="article thumbnail" />
				</div>

				<div className="text-container">
					<a className="saved_link-to-article" href={this.props.article.url} target='blank'>	
					<h3 className ="saved_title">{this.props.article.title}</h3></a>
					<p className="saved_description">{this.props.article.description}</p>	
					<a className="saved_source" href={this.props.article.source.name} target='blank'>
					<p>{this.props.article.source.name.toUpperCase()}</p>
				</a>
				</div>
				<div onClick={() => this.props.removeArticle(this.props.article)}>
					<BookmarkFillIcon size={16} className="saved_bookMark" /> 
				</div>
				{/* </div> */}
			</div>

		)
	}
}

const mapDispatchToProps = dispatch => {
	return{
		removeArticle: article => {dispatch(removeUserArticle(article))}
	}
}

const SavedArticleComponent = connect(null, mapDispatchToProps)(SavedArticleComponentItem)

export default SavedArticleComponent;