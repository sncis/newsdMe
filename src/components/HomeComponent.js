import React from 'react'
import { connect } from 'react-redux';
import ArticleList from "./Articles/ArticleList"
import { loadDailyArticles } from '../store/actions/newsAPIdailyArticleActions'


export class HomeComponent extends React.Component {
  componentDidMount(){
    this.props.loadDailyArticles()
  }

  render(){
    return (
      <div className="">
        <div>
         <h2>Top daily Headlines</h2>  
         <ArticleList listType='newsAPIdailyArticle'/>
       </div>
     </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return{
    loadDailyArticles: () => dispatch(loadDailyArticles())
  }
}


export default connect(null, mapDispatchToProps)(HomeComponent)
