import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  ListGroup,
  Accordion
} from "react-bootstrap";
import NavigationBar from "../Nav/NavigationBar";
import './Project.css';
import Charts from "../Charts/Charts";
import Firebase from 'firebase/app';
import "firebase/database"

class Project extends React.Component {
  state = {};

  createTaskListResume = () => {
    var items = []
    for(var i = 0; i < this.state.tasks.length; i++ ) {
      var hoursWorked = 0;
      for(var j = 0; j < this.state.tasks[i].collaborators.length; j++)
        hoursWorked = this.state.tasks[i].collaborators[j].hours
      items.push(
        <ListGroup.Item key={i.toString()} className="task-resume-item">
          {this.state.tasks[i].name + "  / " + (hoursWorked * 100 / this.state.tasks[i].hours).toFixed(2).toString() + "%"}
        </ListGroup.Item>);
    }
    return (
      <ListGroup className="tasks-resume">
        {items}
      </ListGroup>
    );
  }

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
    let ref = Firebase.database().ref('/' + this.props.profile.googleId + '/' + this.props.projectId.toString());
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
    return Math.floor(this.getActualTimestampDiff() / (1000 * 60 * 60 * 24)) + 1;
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
        <NavigationBar/>  
        <Container fluid>
          <br/>
          <Row className="justify-content-center">
            <Col xs={4} md={4} lg={4}>
              <Card className="project-card">
                <Card.Body>
                  <Card.Title className="card-title"> {this.state.name} </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Day number {this.getActualDay()} of week {this.getActualWeek()}</Card.Subtitle>
                  <Card.Text>
                    {this.state.description}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br/>
              {this.createTaskListResume()}
              <div style={{paddingTop:"10px"}}>
                <Button variant="secondary">Add Progress</Button>
              </div>
            </Col>  
            <Col xs={8} md={8} lg={8} style={{backgroundColor:"green"}}>
              column 2
            </Col>
          </Row>
          <br/>
          <Row>
            <Col xs={4} md={4} lg={4}>
              {this.createTaskListInfo()}
            </Col>
            <Col xs={8} md={8} lg={8}>
              <Charts/>
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