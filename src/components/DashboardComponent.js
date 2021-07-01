import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import ArticleList from "./Articles/ArticleList"
import { getUserArticles} from '../store/actions/userArticleActions'
import { goToAdminSide } from "../store/actions/userActions/loginActions"
import {getBackendBackendErrorMsgSelector} from "../store/selectors/backendDataSelector";



export class DashboardComponent extends React.Component {
  componentDidMount(){
    this.props.loadUserArticles()
  }


  render(){
    return (
      <div className="">
        <div>
         <h2>Your bookmarked Articles</h2>
          <Link onClick={() => this.props.goToAdminSide()} to='/admin' data-cy="admin-link">go to admin side</Link>
          {this.props.backendErrorMsg && <p>{this.props.backendErrorMsg}</p>}
          <ArticleList listType='userArticle'/>
       </div>
     </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return{
    loadUserArticles: () => dispatch(getUserArticles()),
    goToAdminSide: () => dispatch(goToAdminSide())
  }
}
const mapStateToProps = state =>{
  return {
    backendErrorMsg: getBackendBackendErrorMsgSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

