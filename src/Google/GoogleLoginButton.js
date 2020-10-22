import React, { Component } from 'react'
import { connect } from "react-redux";
import {loginAction} from "../actions/loginAction"
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const CLIENT_ID = '1059520092363-p92ts9q2f437a9lj9a6g223pd42a8db5.apps.googleusercontent.com';

class GoogleLoginButton extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {
    if(response.accessToken){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken
      }));
      console.log(response);
      this.props.login({profile: response.profileObj, isLoggedIn: true});
    }
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
  }

  handleLoginFailure (response) {
    console.log('Failed to log in');
    console.log(response);
  }

  handleLogoutFailure (response) {
    console.log('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
    </div>
    )
  }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    login: (content) => dispatch(loginAction(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLoginButton);