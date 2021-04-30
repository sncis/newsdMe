import React from 'react'
import { Redirect, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import { getConfirmedSelector, getResendTokenMsgSelector } from "../../store/selectors/userSelectors";
import {confirmRegistration,resendConfirmationToken} from "../../store/actions/userActions/registrationActions";
import "../../css/AuthForm.css"
import {emailValidator, validateConfirmationToken} from "../../validators/validators";



export class ConfirmationComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      index: 1,
      token:'',
      toggleShow: "hidden",
      email:'',
      invalidError:''
    }

  }

  componentDidMount(){
    const token = new URLSearchParams(this.props.location.search).get('token');
    console.log("*****************");
    console.log(token);
    const newToken = validateConfirmationToken(token) ? token : 'wrong otken'
    console.log(newToken)
    this.setState({
      index: parseInt(this.props.match.params.index),
      token: validateConfirmationToken(token) ? token : ''
    })
  }

  handleChange = event =>{
    console.log(this.state)
    const isCheckbox = event.target.type === 'checkbox'
    this.setState({
      [event.target.name]: isCheckbox ? event.target.checked : event.target.value
    })
  };

  showEmailField = () => {
    this.setState({
      // toggleShow : this.state.toggleShow === "hidden" ? "show" : "hidden"
      toggleShow : "show"

    })
  };

  handleSubmit = (e)=>{
    e.preventDefault()
    let isValid = emailValidator(this.state.email)
  console.log(isValid)
    if(isValid){
      console.log(isValid)
      this.setState({invalidError:""})


      this.props.resendConfirmationToken(this.state.email);
    }else{
      this.setState({invalidError:" please provide valid email"})
    }
  };



  render() {
    return (
        <div className="auth-form" >
          <div>
            {this.state.index === 1 &&<div>
              <p> You successful registered</p>
              <p>Check your emails to confirm your registration</p>

              <p onClick={this.showEmailField}>Resend token?</p>

              <form onSubmit={this.handleSubmit} className={this.state.toggleShow}>
                <div className="resendTokenEmail" >
                  <label htmlFor="email">Email</label>
                  <input type="email" placeholder="your Email" name="email" value={this.state.email} onChange={this.handleChange} />

                  <button type="submit">Submit</button>
                  {this.props.resendTokenMsg && <p>{this.props.resendTokenMsg}</p>}
                </div>
                <p>{this.state.invalidError}</p>

              </form>

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
    confirmUser: (token) => dispatch(confirmRegistration(token)),
    resendConfirmationToken: (email) => dispatch(resendConfirmationToken(email))
  }

};

const mapStateToProps = state => {
  return{
    isRegistered: true,
    isConfirmed: getConfirmedSelector(state),
    isConfirmationSuccess: getConfirmedSelector(state),
    resendTokenMsg: getResendTokenMsgSelector(state)
  }

};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ConfirmationComponent))