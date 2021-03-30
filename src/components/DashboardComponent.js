import React from 'react'
import { connect } from 'react-redux';
import ArticleList from "./Articles/ArticleList"
import { getUserArticles } from '../store/actions/userArticleActions'



export class DashboardComponent extends React.Component {
  componentDidMount(){
    this.props.loadUserArticles()
  }

  render(){
    return (
      <div className="">
        <div>
         <h2>Your bookmarked Articles</h2>  
         <ArticleList listType='userArticle'/>
       </div>
     </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return{
    loadUserArticles: () => dispatch(getUserArticles())
  }
}


export default connect(null, mapDispatchToProps)(DashboardComponent)

