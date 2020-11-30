import React from "react";
import { connect } from "react-redux";
import {
  Nav, 
  Form, 
  Button, 
  Navbar,
  Image
} from "react-bootstrap";
import StateLoader from "../StateLoader";
import { BsArrowReturnLeft, BsFillHouseFill, BsPlus} from "react-icons/bs";

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
          <Nav.Link href="./home"><BsFillHouseFill/></Nav.Link>
          {(this.props.returnProject? <Nav.Link href="./project"> <BsArrowReturnLeft/></Nav.Link> : <div/>)}
          {(this.props.createProject ? <Nav.Link href="./create-project"><BsPlus/>Project</Nav.Link> : <div/>)}
          {(this.props.createTask ? <Nav.Link onClick={this.props.createTask}><BsPlus/>Task</Nav.Link> : <div/>)}
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