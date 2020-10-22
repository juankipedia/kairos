import React from "react";
import { connect } from "react-redux";
import {
  Nav, 
  Form, 
  Button, 
  Navbar,
  Image
} from "react-bootstrap";
import StateLoader from "../StateLoader"

const stateLoader = new StateLoader();

class Home extends React.Component {
  state = {
  };

  logout = ()=>{
    stateLoader.initializeState();
    stateLoader.saveState();
    window.location.assign('./');
  }

  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <Image className="justify-content-end" width="50" height="50" src={this.props.profile.imageUrl} roundedCircle/>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>Home</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-primary" onClick={this.logout}>Logout</Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    ...state
});
  
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);