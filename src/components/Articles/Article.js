import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {BookmarkFillIcon, BookmarkIcon} from '@primer/octicons-react'
import { getUserLoginSelector } from '../../store/selectors/userSelectors'
import "../../css/UserArticle.css";
import "../../css/Article.css";

import { saveUserArticle, removeUserArticle } from "../../store/actions/userArticleActions"
import {cleanUrlValidator, urlValidator} from "../../validators/validators";


export class Article extends React.Component {
	toogleIsBoomarked = (article) => {
		if(this.props.isLoggedIn){
			console.log("##############")
			console.log(article.isBookmarked)
			if(!article.isBookmarked){
				article['isBookmarked'] = true;
				console.log(article.isBookmarked)

				this.props.saveUserArticle(article)
			}else{
				article['isBookmarked'] = false;
				this.props.removeUserArticle(article)
			}
		}else {
			this.props.history.push('/auth/1')
		}
	}

	render(){
		// let source = this.props.article.source.name !== undefined ? this.props.article.source.name : this.props.article.source;
		return(
			<div className="article_container" >
					
					<a className="article_link-to-article" href={urlValidator(this.props.article.link)? this.props.article.link : ""} target='blank'>
						
						<div className="article_thumbnail">
							<img src={this.props.article.link} alt="article thumbnail" />
						</div>

						<h3 className ="article_title">{this.props.article.title}</h3>
						<p className="article_description">{this.props.article.summary}</p>
					</a>


					<a href={urlValidator(this.props.article.link)? this.props.article.link : ""} target="blank">
						<p className="article_source">{cleanUrlValidator(this.props.article.clean_url) ? this.props.article.clean_url : ""}</p>
					</a>


					<div className="article_bookmark-container" onClick={() => this.toogleIsBoomarked(this.props.article)}>
						{ !this.props.article.isBookmarked && <BookmarkIcon size={16} className="article_bookMark" /> }
						{ this.props.article.isBookmarked && <BookmarkFillIcon size={16} className="article_bookMark" /> }
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
	history: PropTypes.shape({
		push: PropTypes.func
	}),
	isLoggedIn: PropTypes.bool
}

const mapStateToProps = state =>{
	return{
		isLoggedIn: getUserLoginSelector(state)
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

