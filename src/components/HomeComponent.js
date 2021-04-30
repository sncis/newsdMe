import React from 'react'
import { connect } from 'react-redux';
import ArticleList from "./Articles/ArticleList"
import { fetchArticles } from "../store/actions/articleActions/newsApiActions"
import {getBackendBackendErrorMsgSelector} from "../store/selectors/backendDataSelector";

export class HomeComponent extends React.Component {
  componentDidMount(){
    this.props.loadDailyArticles()
  }
  render(){
    return (
      <div className="">
        <div>
         <h2>Top daily Headlines</h2>
          {this.props.backendErrorMsg && <p>{this.props.backendErrorMsg}</p>}
          <ArticleList listType='newsApiArticle'/>
       </div>
     </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    backendErrorMsg: getBackendBackendErrorMsgSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return{
    loadDailyArticles: () => dispatch(fetchArticles())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
