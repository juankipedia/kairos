import React from "react";
import { connect } from "react-redux";
import {
  Nav, 
  Form, 
  Button, 
  Navbar,
  Image,
  Container,
  ListGroup,
  Col,
  Row
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
        <Container>
          <Row className="justify-content-center" style={{padding: "2em"}}>
            <Col>
              <ListGroup style={{overflowY: "scroll", maxHeight: "25em"}}>
                <ListGroup.Item action>
                  Project 1.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 2.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 1.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 2.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 1.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 2.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 1.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 2.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 1.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 2.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 25.
                </ListGroup.Item>
                <ListGroup.Item action>
                  Project 30.
                </ListGroup.Item>
              </ListGroup>
            </Col>  
          </Row>
        </Container>
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