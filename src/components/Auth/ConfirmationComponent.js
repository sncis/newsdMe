import React from 'react'
import { Redirect, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import { getConfirmedSelector, getResendTokenMsgSelector,getRegistrationSuccessSelector, isLoadingUserSelector } from "../../store/selectors/userSelectors";
import {confirmRegistration,resendConfirmationToken} from "../../store/actions/userActions/registrationActions";
import "../../css/AuthForm.css"
import {emailValidator, validateConfirmationToken} from "../../validators/validators";



export class ConfirmationComp extends React.Component {
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
    let token = new URLSearchParams(this.props.location.search).get('token');
    let newToken = '';
    if(token !== null){
      console.log("token from url")
       newToken = validateConfirmationToken(token) ? token : ''
    }

    this.setState({
      index: parseInt(this.props.match.params.index),
      token: newToken
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
      toggleShow : "show"
    })
  };

  handleSubmit = (e)=>{
    e.preventDefault()
    let isValid = emailValidator(this.state.email)
    console.log(isValid)
    if(isValid){
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
            {this.state.index === 1 &&<div className='registered'>
              <p> You successful registered</p>
              <p>Check your emails to confirm your registration</p>

              <p id="resent-token-link" onClick={this.showEmailField}>Resend token?</p>

              <form onSubmit={this.handleSubmit} id='resendForm' className={this.state.toggleShow}>
                <div className="resendTokenEmail" >
                  <label htmlFor="email">Email</label>
                  <input  id='emailField' type="email" placeholder="your Email" name="email" value={this.state.email} onChange={this.handleChange} />
                  <p id='errorMsg'>{this.state.invalidError}</p>

                  <button id='submitBtn' type="submit">Submit</button>
                  {this.props.resendTokenMsg && <p>{this.props.resendTokenMsg}</p>}
                </div>
                {this.props.isLoading && <p>{this.props.isLoading}</p>}

              </form>

            </div>}

            {this.state.index === 2 && <div className="confirmation-text-container">
            <p>Yeayyy Your almost in!</p>
              <p>click button below to confirm your registration</p>
              <button id='confirmRegistration' onClick={() => this.props.confirmUser(this.state.token)}>Confirm</button>
            </div>}

            {this.props.isLoading && <p>{this.props.isLoading}</p>}
            {this.props.resendTokenMsg && <p>{this.props.resendTokenMsg}</p>}

            {this.props.isConfirmed && <Redirect to="/"/>}
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
    isRegistered: getRegistrationSuccessSelector(state),
    isConfirmed: getConfirmedSelector(state),
    isLoading: isLoadingUserSelector(state),
    // isConfirmationSuccess: getConfirmedSelector(state),
    resendTokenMsg: getResendTokenMsgSelector(state)
  }

};


const ConfirmationComponent = withRouter(connect(mapStateToProps,mapDispatchToProps)(ConfirmationComp))
export default ConfirmationComponent;