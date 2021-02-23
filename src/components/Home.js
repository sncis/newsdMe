import React, { Component} from "react";
import { connect } from 'react-redux';


import { handleSearch, loadDailyArticles } from '../store/actions/newsApiActions'
import ArticleList from "./ArticleList"



class HomeComponent extends Component {
  componentDidMount(){
    this.props.loadDailyArticles()
  }

  render(){
    return (
      <div className="">
        <div>
         <h1>welcome to newsd</h1>
         <h2> Top Headlines</h2>      
         <ArticleList articles={this.articles}/>
       </div>
     </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    isLoggedIn : state.userReducer.loggedIn
  }
  
}

const mapDispatchToProps = dispatch => {
  return{
    loadDailyArticles: () => dispatch(loadDailyArticles())
  }
}


const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)

export default Home;
