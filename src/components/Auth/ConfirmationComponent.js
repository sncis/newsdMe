import React from 'react'
import { Redirect, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import { getConfirmedSelector } from "../../store/selectors/userSelectors";
import {confirmRegistration} from "../../store/actions/userActions/registrationActions";
import "../../css/AuthForm.css"



export class ConfirmationComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      index: 1,
      token:'',
      toggleShow: "hidden",
      email:'',
    }

  }

  componentDidMount(){
    const token = new URLSearchParams(this.props.location.search).get('token');
    console.log("*****************");
    console.log(token);
    this.setState({
      index: parseInt(this.props.match.params.index),
      token: token
    })
  }

  handleChange = event =>{
    console.log(this.state)
    const isCheckbox = event.target.type === 'checkbox'
    this.setState({
      [event.target.name]: isCheckbox ? event.target.checked : event.target.value
    })
  }

  showEmailField = () => {
    console.log(this.state.toggleShow)
    this.setState({
      toggleShow : this.state.toggleShow === "hidden" ? "show" : "hidden"
    })

    console.log(this.state.toggleShow)
  }

  render() {

    return (
        <div className="auth-form" >
          <div>
            {this.state.index === 1 &&<div>
              <p> You successful registered</p>
              <p>Check your emails to confirm your registration</p>

              <a onClick={this.showEmailField}>Reset token?</a>

            <div  className={`resendTokenEmail ${this.state.toggleShow}`}>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="your Email" name="email" value={this.state.email} onChange={this.handleChange} />

              <button type="submit" onSubmit={this.handelSubmit}>Submit</button>

            </div>

            </div>}

            {this.state.index === 2 && <div className="confirmation-text-container">
            <p>Yeayyy Your almost in!</p>
              <p>click button below to confirm your registration</p>
              <button onClick={() =>this.props.confirmUser(this.state.token)}>Confirm</button>
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
    confirmUser: (token) => dispatch(confirmRegistration(token))
  }

};

const mapStateToProps = state => {
  return{
    isRegistered: true,
    isConfirmed: getConfirmedSelector(state),
    isConfirmationSuccess: getConfirmedSelector(state),
  }

};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ConfirmationComponent))