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

class NavigationBar extends React.Component {
  state = {
  };

  logout = ()=>{
    stateLoader.initializeState();
    stateLoader.saveState();
    window.location.assign('./');
  }

  render() {
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <Image className="justify-content-end" width="50" height="50" src={this.props.profile.imageUrl} roundedCircle/>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="./home">Home</Nav.Link>
          {(this.props.progress ? <Nav.Link href="./project">Project</Nav.Link> : <div/>)}
          {(this.props.create ? <Nav.Link href="./create">Create</Nav.Link> : <div/>)}          
        </Nav>
        <Form inline>
          <Button variant="outline-primary" onClick={this.logout}>Logout</Button>
        </Form>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
  
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);