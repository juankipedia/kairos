import React from "react";
import {connect} from "react-redux";
import {loginAction} from "../actions/loginAction"
import './Main.css'
import GoogleLoginButton from "../Google/GoogleLoginButton.js";
import StateLoader from "../StateLoader"
import logoPC from "../resources/kairosLogo.png"
import logoMobile from "../resources/kairosLogoMobile.png"
import {Row, Container, Image} from "react-bootstrap";

const stateLoader = new StateLoader();

class Main extends React.Component {
  state = {
  };

  render() {
    if(this.props.isLoggedIn) {
      stateLoader.saveState(this.props)
      window.location.assign('./Home');
    }
    let logoSrc = window.innerWidth >= 1020 ? logoPC : logoMobile;
  	return (
      <Container fluid>
        <Row className="SpacedRow justify-content-center">
          <Image src={logoSrc}  alt="kairos"/>
        </Row>
        <Row className="SpacedRow justify-content-center">
            kairos
        </Row>
        <Row className="SpacedRow justify-content-center">
            <GoogleLoginButton/>
        </Row>
      </Container> 
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