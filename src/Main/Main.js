import React from "react";
import { connect } from "react-redux";
import {loginAction} from "../actions/loginAction"
import './Main.css'
import GoogleLoginButton from "../Google/GoogleLoginButton.js";
import StateLoader from "../StateLoader"

const stateLoader = new StateLoader();

class Main extends React.Component {
  state = {
  };

  render() {
    if(this.props.isLoggedIn) {
      stateLoader.saveState(this.props)
      window.location.assign('./Home');
    }
  	return (
        <header className="App-header">          
          Kairos.
          <GoogleLoginButton/>
        </header>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  login: (content) => dispatch(loginAction(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);