import React from 'react'
import { getBackendTextSelector } from "../store/selectors/backendDataSelector"
import {connect } from "react-redux"


export class AdminPage extends React.Component{

  render(){
    return(
        <div>
          <h2>Hello Admin</h2>
          <p>{this.props.backendText}</p>
        </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    backendText : getBackendTextSelector(state)
  }
}

export default connect(mapStateToProps, null)(AdminPage)