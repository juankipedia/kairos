import React from "react";
import { connect } from "react-redux";
import {
  Container,
  ListGroup,
  Col,
  Row
} from "react-bootstrap";
import StateLoader from "../StateLoader"
import NavigationBar from "../Nav/NavigationBar"

const stateLoader = new StateLoader();

class Home extends React.Component {
  state = {
  };

  openProject = (id)=>{
    stateLoader.saveState({...this.props, projectId: id});
    window.location.assign('./project')
  }

  render() {
    return (
      <div>
        <NavigationBar/>
        <Container>
          <Row className="justify-content-center" style={{padding: "2em"}}>
            <Col>
              <ListGroup style={{overflowY: "scroll", maxHeight: "25em"}}>
                <ListGroup.Item action onClick={() => this.openProject(1)}>
                  Project 1.
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => this.openProject(1)}>
                  Project 2.
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => this.openProject(1)}>
                  Project 1.
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