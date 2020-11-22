import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  Accordion,
  Form
} from "react-bootstrap";
import NavigationBar from "../Nav/NavigationBar";
import Firebase from 'firebase/app';
import "firebase/database";
import "./AddProgress.css"

class AddProgress extends React.Component {
  state = {};

  changeSelectedCollaborator  = (e, taskId) => {
    let prevState = this.state;
    if(!prevState.formData[taskId]){
      prevState.formData[taskId] = {
        collaborator: "None",
        hours: 0,
        description: "None"
      }
    }
    prevState.formData[taskId]["collaborator"] = e.target.value;
    this.setState(prevState);
  }

  changeHoursWorked = (e, taskId) => {
    let prevState = this.state;
    if(!prevState.formData[taskId]){
      prevState.formData[taskId] = {
        collaborator: "None",
        hours: 0,
        description: "None"
      }
    }
    prevState.formData[taskId]["hours"] = parseInt(e.target.value);
    this.setState(prevState);
  }

  createTaskListForms = () => {
    var cards = [];
    for(let i = 0; i < this.state.project.tasks.length; i++) {
      var collaborators = [];
      var collaboratorsLen = this.state.project.tasks[i].collaborators.length; 
      for(let j = 0; j < collaboratorsLen; j++)
        collaborators.push(this.state.project.tasks[i].collaborators[j].email);
      cards.push(
        <Card key={i.toString()}>
          <Accordion.Toggle as={Card.Header} eventKey={i.toString()}>
            {this.state.project.tasks[i].name}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i.toString()}>
            <Card.Body className="task-description">
              <Form>
                <Form.Group controlId={"DescriptionForm" + this.state.project.tasks[i].name}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control placeholder="Enter Description"/>
                </Form.Group>
                <Form.Group controlId={"HourSelect" + this.state.project.tasks[i].name}>
                  <Form.Label>Hours worked</Form.Label>
                  <Form.Control placeholder="Number of Hours" type="number" onChange={e => this.changeHoursWorked(e, i.toString())}/>
                </Form.Group>
                <Form.Group controlId={"CollaboratorSelect" + this.state.project.tasks[i].name}>
                  <Form.Label>Collaborator</Form.Label>
                  <Form.Control as="select" onChange={e => this.changeSelectedCollaborator(e, i.toString())}>
                    <option>None</option>
                    {collaborators.map(c => <option key = {c + i.toString()}>{c}</option>)}
                  </Form.Control>
                </Form.Group>
              </Form>
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
      this.setState({project: project, formData:{}})
    });
  }

  componentDidMount() {
    this.loadProjectData();
  }

  cancelAddProgress = () => {
    window.location.assign('./project');
  }

  confirmAndSubmit = () => {
    Object.keys(this.state.formData).forEach(t => {
      if(this.state.formData[t].collaborator !== "None" && this.state.formData[t].hours !== 0){
        let collaboratorPos = -1;
        var collaboratorsLen = this.state.project.tasks[t].collaborators.length; 
        for(let j = 0; j < collaboratorsLen; j++){
          if(this.state.project.tasks[t].collaborators[j].email === this.state.formData[t].collaborator){
            collaboratorPos = j;
            break;
          }
        }
        let key = '/' + this.props.profile.googleId + '/' + this.props.projectId + '/tasks/' + t + '/collaborators/' + collaboratorPos.toString();
        Firebase.database().ref(key + "/hours").set(this.state.formData[t].hours + this.state.project.tasks[t].collaborators[collaboratorPos].hours);
        Firebase.database().ref(key + "/contributions").set(this.state.project.tasks[t].collaborators[collaboratorPos].contributions + 1);
      }
      window.location.assign('./project');
    });
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
            New Progress.
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col xs={8} md={8} lg={8}>
              {this.createTaskListForms()}
            </Col>
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col xs={2} md={2} lg={2}>
              <Row className="justify-content-center">
                <Button variant="danger" onClick={this.cancelAddProgress}>Cancel</Button>
              </Row>
            </Col>
            <Col xs={2} md={2} lg={2}>
              <Row className="justify-content-center">
                <Button variant="success" onClick={this.confirmAndSubmit}>Confirm</Button>
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
