import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  Accordion
} from "react-bootstrap";
import NavigationBar from "../Nav/NavigationBar";
import Firebase from 'firebase/app';
import "firebase/database";
import "./AddProgress.css"

class AddProgress extends React.Component {
  state = {};

  createTaskListInfo = () => {
    var cards = [];
    for(var i = 0; i < this.state.tasks.length; i++) {
      var collaborators = "";
      var collaboratorsLen = this.state.tasks[i].collaborators.length; 
      for(var j = 0; j < collaboratorsLen; j++) {
        collaborators += this.state.tasks[i].collaborators[j].email;
        if(j + 1 !== collaboratorsLen)
          collaborators += ", "
      }
      cards.push(
        <Card key={i.toString()}>
          <Accordion.Toggle as={Card.Header} eventKey={i.toString()}>
            {this.state.tasks[i].name}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i.toString()}>
            <Card.Body className="task-description">
              {this.state.tasks[i].description}
              <br/>
              Collaborators:
              <br/>
              {collaborators}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ); 
    }

    return(
      <Accordion className="tasks-info">
        {cards}
      </Accordion>  
    );
  }

  loadProjectData = () => {
    let ref = Firebase.database().ref('/' + this.props.profile.googleId + '/' + this.props.projectId);
    ref.on('value', snapshot => {
      const project = snapshot.val();
      this.setState(project)
    });
  }

  componentDidMount() {
    this.loadProjectData();
  }


  getActualTimestampDiff = () => {
    var cur_date = new Date();
    var cur_timestamp = cur_date.getTime();
    var diff  = Math.abs(cur_timestamp - this.state.start);
    return diff;
  }

  getActualDay = () => {
    var w = this.getActualWeek() - 1;
    return (Math.floor(this.getActualTimestampDiff() / (1000 * 60 * 60 * 24)) - w * 7) + 1;
  }

  getActualWeek = () => {
    return Math.floor(this.getActualTimestampDiff() / (1000 * 60 * 60 * 24 * 7)) + 1;
  }

  render() {
    if(!this.props.projectId)
      window.location.assign('./home');
    if(Object.keys(this.state).length === 0)
      return <p> Loading please wait </p>
    return (
      <div>
        <NavigationBar progress={true}/>  
        <Container fluid>
          <br/>
          <Row className="justify-content-center">
            Day number {this.getActualDay()} of week {this.getActualWeek()}.
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col xs={8} md={8} lg={8}>
              {this.createTaskListInfo()}
            </Col>
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col xs={2} md={2} lg={2}>
              <Row className="justify-content-center">
                <Button variant="danger">Cancel</Button>
              </Row>
            </Col>
            <Col xs={2} md={2} lg={2}>
              <Row className="justify-content-center">
                <Button variant="success">Confirm</Button>
              </Row>
            </Col>
          </Row>
          <br/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProgress);
