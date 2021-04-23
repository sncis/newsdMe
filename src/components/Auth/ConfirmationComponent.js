import React from 'react'
import { Redirect, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import {getConfirmedSelector, getRegisteredSelector} from "../../store/selectors/userSelectors";
import {confirmRegistration} from "../../store/actions/userActions/registrationActions";
import "../../css/AuthForm.css"



export class ConfirmationComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={
      index: 1,
      token:''
    }

  }

  componentDidMount(){
    const token = new URLSearchParams(this.props.location.search).get('token');
    this.setState({
      index: parseInt(this.props.match.params.index),
      token: token
    })
  }

  render() {

    return (
        <div className="auth-form" >
          <div>
            {/*{this.props.isRegistered && <div key={uuidv4()}>*/}
            {this.state.index === 1 &&<div>
              <p> You successful registered</p>
              <p>Check your emails to confirm your registration</p>
            </div>}

            {/*{this.props.isRegistered && this.props.isConfirmed && <div key={uuidv4()}>*/}
            {this.state.index === 2 && <div className="confirmation-text-container">
            <p>Yeayyy Your almost in!</p>
              <p>click button below to confirm your registration</p>
              <button onClick={this.props.confirmUser}>Confirm</button>
            </div>}

            {this.props.isConfirmationSuccess && <Redirect to="/"/>}
            {!this.props.isRegistered && <Redirect to='/confirm/1'/>}

          </div>
        </div>
    )
  }
}


const mapDispatchToProps = (dispatch)=>{
  return {
    confirmUser: () => dispatch(confirmRegistration(this.state.token))
  }

}

const mapStateToProps = state => {
  return{
    isRegistered: true,
    isConfirmed: getConfirmedSelector(state),
    isConfirmationSuccess: getConfirmedSelector(state),
  }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ConfirmationComponent))