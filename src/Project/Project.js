import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  ListGroup,
  Accordion,
  Modal
} from "react-bootstrap";
import NavigationBar from "../Nav/NavigationBar";
import './Project.css';
import Charts from "../Charts/Charts";
import Firebase from 'firebase/app';
import "firebase/database";
import Graph from '../Graph/Graph';
import StateLoader from "../StateLoader";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {BsFillTrashFill} from "react-icons/bs";

const stateLoader = new StateLoader();

class Project extends React.Component {
  state = {};

  closeDeleteModal = () => {
    this.setState({
      ...this.state,
      deleteModalOpen: false,
      taskIdToDelete: -1
    });
  }

  openDeleteModal = (id) => {
    this.setState({
      ...this.state,
      deleteModalOpen: true,
      taskIdToDelete: id
    });
  }

  deleteTask = () => {
    let t = [];
    let cnt = 0;
    for(let i = 0; i < this.state.tasks.length; i++){
      if(this.state.taskIdToDelete !== this.state.tasks[i].id){
        t.push({...this.state.tasks[i], id: cnt});
        cnt++;
      }
    }
    let key = '/' + this.props.profile.googleId + '/' + this.props.projectId + '/tasks';
    Firebase.database().ref(key).set(t);
    this.setState({
      ...this.state,
      tasks: t,
    });
    window.location.assign('./project');
  }

  createTaskListResume = () => {
    var items = []
    for(let i = 0; i < this.state.tasks.length; i++ ) {
      var hoursWorked = 0;
      for(let j = 0; j < this.state.tasks[i].collaborators.length; j++)
        hoursWorked += this.state.tasks[i].collaborators[j].hours
      items.push(
        <ListGroup.Item key={i.toString()} className="task-resume-item">
          <Row>
            <Col xs={10} md={10} lg={10}>
              {this.state.tasks[i].name + "  / " + (hoursWorked * 100 / this.state.tasks[i].hours).toFixed(2).toString() + "%"}
            </Col>
            <Col xs={2} md={2} lg={2}>
              <BsFillTrashFill onClick={() => this.openDeleteModal(this.state.tasks[i].id)}/>
              <Modal show={this.state.deleteModalOpen} onHide={this.closeDeleteModal} size="md">
                  <Modal.Header closeButton>
                    Are you sure you want to delete this task?
                  </Modal.Header>
                  <Modal.Body>
                    <Button variant="danger" onClick={() => this.deleteTask()}>Confirm</Button>
                  </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </ListGroup.Item>
      );
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
    let ref = Firebase.database().ref('/' + this.props.profile.googleId + '/' + this.props.projectId);
    ref.on('value', snapshot => {
      const project = snapshot.val();
      this.setState({...project, deleteModalOpen: false, taskIdToDelete: -1,})
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

  openProgress = () => {
    stateLoader.saveState({...this.props});
    window.location.assign('./progress')
  }

  openCreateTask = () => {
    stateLoader.saveState({...this.props});
    window.location.assign('./create-task')
  }

  render() {
    if(!this.props.projectId)
      window.location.assign('./home');
    if(Object.keys(this.state).length === 0)
      return <LoadingSpinner/>;
    if(!this.state.tasks)
      return(
        <div>
          <NavigationBar createTask={this.openCreateTask}/>
          <Container fluid>
            <Row className="justify-content-center" style={{paddingTop:"25%"}}>
              <Button variant="secondary" onClick={this.openCreateTask}> New Task </Button>
            </Row>
          </Container>
        </div>
      );
    return (
      <div>
        <NavigationBar createTask={this.openCreateTask}/>  
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
                    <br/>
                    {"Members: " + this.state.members.join(", ")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br/>
              {this.createTaskListResume()}
              <div style={{paddingTop:"10px"}}>
                <Button variant="secondary" onClick={this.openProgress}>Add Progress</Button>
              </div>
            </Col>  
            <Col xs={8} md={8} lg={8}>
              <Graph projectData={this.state} actualWeek={this.getActualWeek()}/>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col xs={4} md={4} lg={4}>
              {this.createTaskListInfo()}
            </Col>
            <Col xs={8} md={8} lg={8}>
              <Charts projectData={this.state}/>
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