import React from "react";
import PageContainer from "../containers/PageContainer";
import AuthDialogContainer from "../containers/AuthDialogContainer";
import LoginComponent from "../components/Auth/LoginComponent";
import RegisterComponent from "../components/Auth/RegisterComponent";
import ConfirmationComponent from "../components/Auth/ConfirmationComponent";
import PropTypes from "prop-types";
// import "../../css/AuthForm.css"

export class RegistrationConfirmationPage extends React.Component {

  constructor(props){
    super(props)
    this.state={
      index: 1
    }

  }

  componentDidMount(){
    this.setState({
      index: parseInt(this.props.match.params.index),
      token: this.props.match.params.token ? parseInt(this.props.match.params.token):''
    })
  }


  render(){
    return(

        <PageContainer onlyLogo={true}>

        <AuthDialogContainer title="Confirm Registration">
          {/*<div className="auth-headline"><p>Resent confirmation Token? <span id='loginLink'>click here</span></p></div>*/}
           <ConfirmationComponent />
           </AuthDialogContainer>
        </PageContainer>


    )
  }

}

RegistrationConfirmationPage.propTypes = {
  match: PropTypes.shape({
    params:PropTypes.shape({index: PropTypes.string})
  })
}

export default RegistrationConfirmationPage