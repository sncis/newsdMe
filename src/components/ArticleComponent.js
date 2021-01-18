import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BookmarkIcon, BookmarkFillIcon} from '@primer/octicons-react'

import { bookmark, unBookmark } from "../store/actions/articleActions"

import "../css/Article.css";

import dummy from "../assets/img/dummy.jpg";

export class ArticleComp extends Component {

	constructor(props){
		super(props)
	
	}

	toogleIsBoomarked = (article) => {
		console.log(article.isBookmarked )
		!article.isBookmarked ? this.props.bookmark(article) : this.props.unBookmark(article)
		console.log(article.isBookmarked )

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
					{/* <a href={item.source.name} target=""blank>
						<p className="source">source: {item.source.name}</p>
					</a> */}
					<div onClick={() => this.toogleIsBoomarked(this.props.article)}>
						{ !this.props.article.isBookmarked && <BookmarkIcon size={16} className="bookMark" /> }
						{ this.props.article.isBookmarked && <BookmarkFillIcon size={16} className="bookMark" /> }
					</div>
				</div>
			</div>
		)
	}
}


const mapDispatchToProps = dispatch =>{
	return{
		bookmark: article => { dispatch(bookmark(article))},
		unBookmark : article => {dispatch(unBookmark(article))}
	}	
}

const ArticleComponent = connect(null, mapDispatchToProps)(ArticleComp)
export default ArticleComponent;