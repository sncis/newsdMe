import React from 'react'
import { connect } from 'react-redux';
import ArticleList from "./Articles/ArticleList"
import { fetchArticles } from "../store/actions/articleActions/newsApiActions"

export class HomeComponent extends React.Component {
  componentDidMount(){
    this.props.loadDailyArticles()
  }

  render(){
    return (
      <div className="">
        <div>
         <h2>Top daily Headlines</h2>  
         <ArticleList listType='newsApiArticle'/>
       </div>
     </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return{
    loadDailyArticles: () => dispatch(fetchArticles())
  }
}


export default connect(null, mapDispatchToProps)(HomeComponent)
