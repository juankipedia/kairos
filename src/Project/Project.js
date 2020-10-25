import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Col,
  Row
} from "react-bootstrap";
import NavigationBar from "../Nav/NavigationBar"

class Project extends React.Component {
  state = {
  };

  render() {
    return (
      <div>
        <NavigationBar/>  
        <Container>
          <Row className="justify-content-center" style={{padding: "2em"}}>
            <Col>
                <p>Welcome to some project</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Project);