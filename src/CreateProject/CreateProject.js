import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  Modal
} from "react-bootstrap";
import NavigationBar from "../Nav/NavigationBar";
import Firebase from 'firebase/app';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "firebase/database";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class CreateProject extends React.Component {
  state = {};

  loadProjects = () => {
    var cur_date = new Date();
    var cur_timestamp = cur_date.getTime();
    let ref = Firebase.database().ref('/' + this.props.profile.googleId + '/projects');
    ref.on('value', snapshot => {
      const state = {
        projects: snapshot.val(), 
        formData:{
          name: "",
          description: "",
          members: "",
          startDate: cur_timestamp,
          nameInvalid: false,
          descriptionInvalid: false,
          membersInvalid: false
        },
        showCalendar: false
      };
      this.setState(state)
    });
  }

  componentDidMount() {
    if(this.props.profile === undefined)
      window.location.assign('./');
    this.loadProjects();
  }

  handleSubmit = (event) => {
    let nameInvalid = false;
    let descriptionInvalid = false;
    let membersInvalid = false;
    if(this.state.formData.name.length === 0) nameInvalid = true;
    if(this.state.formData.description.length === 0) descriptionInvalid = true;
    if(this.state.formData.members.length === 0) membersInvalid = true;
    if(nameInvalid || descriptionInvalid || membersInvalid){
      this.setState({
        ...this.state, 
        formData:{
          ...this.state.formData,
          nameInvalid: nameInvalid,
          descriptionInvalid: descriptionInvalid,
          membersInvalid: membersInvalid
        }
      });
      return;
    }

    let members = this.state.formData.members;
    members = members.replace(/ /g,'');
    let membersList = members.split(";");
    let projectId;
    let projects;
    if(this.state.projects){
      projectId = this.state.projects.length;
      projects = this.state.projects;
    }
    else{
      projectId = 1;
      projects = {};
    }
    projects[projectId] = this.state.formData.name;
    let key = '/' + this.props.profile.googleId;
    Firebase.database().ref(key + '/' + projectId).set({
      description: this.state.formData.description,
      id: projectId,
      members: membersList,
      name: this.state.formData.name,
      start: this.state.formData.startDate,
      tasks: []  
    });
    Firebase.database().ref(key + '/projects').set(projects);
    window.location.assign('./home');
  };

  changeName = (e) => {
    this.setState({
      ...this.state, 
      formData:{
        ...this.state.formData,
        name: e.target.value,
        nameInvalid: false
      }
    });
  };

  changeDescription = (e) => {
    this.setState({
      ...this.state, 
      formData:{
        ...this.state.formData,
        description: e.target.value,
        descriptionInvalid: false
      }
    });
  };

  changeMembers = (e) => {
    this.setState({
      ...this.state, 
      formData:{
        ...this.state.formData,
        members: e.target.value,
        membersInvalid: false
      }
    });
  };

  changeStartDate = (date) => {
    this.setState({
      ...this.state, 
      formData:{
        ...this.state.formData,
        startDate: date.getTime()
      }
    });
  };

  handleCloseCalendar = () => this.setState({...this.state, showCalendar: false});
  handleShowCalendar = () => this.setState({...this.state, showCalendar: true});

  render() {
    if(Object.keys(this.state).length === 0)
        return <LoadingSpinner/>;
    return (
      <div>
        <NavigationBar/>
        <Container fluid>
          <br/>
          <Row className="justify-content-center">
            New Project.
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col xs={6} md={6} lg={6}>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter project name" 
                                      required isInvalid={this.state.formData.nameInvalid}
                                      onChange={e => this.changeName(e)}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a name for the project.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholder="Enter description" 
                                      required isInvalid={this.state.formData.descriptionInvalid}
                                      onChange={e => this.changeDescription(e)}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a description for the project.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="members">
                        <Form.Label>Members</Form.Label>
                        <Form.Control placeholder="Enter members email separated by ;"
                                      required isInvalid={this.state.formData.membersInvalid}
                                      onChange={e => this.changeMembers(e)}/>
                        <Form.Control.Feedback type="invalid">
                            Invalid members list.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Button onClick={this.handleShowCalendar} variant="light">Pick start date</Button>
                      <Modal show={this.state.showCalendar} onHide={this.handleCloseCalendar} size="sm">
                          <Modal.Header closeButton>
                          </Modal.Header>
                          <Modal.Body>
                            <Calendar onChange={this.changeStartDate}/>
                          </Modal.Body>
                      </Modal>
                    </Form.Group>
                </Form>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={6} md={6} lg={6}>
              <Button variant="success" onClick={this.handleSubmit}>Create</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
