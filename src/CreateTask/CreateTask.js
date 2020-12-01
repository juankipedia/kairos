import React from "react";
import { connect } from "react-redux";
import NavigationBar from "../Nav/NavigationBar";
import Firebase from 'firebase/app';
import "firebase/database";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {
    Button,
    Form,
    Row,
    Col,
    Container
} from "react-bootstrap";

class CreateTask extends React.Component {
  state = {};

  loadProjectData = () => {
    let ref = Firebase.database().ref('/' + this.props.profile.googleId + '/' + this.props.projectId);
    ref.on('value', snapshot => {
        const project = snapshot.val();
        this.setState({
            project: project, 
            formData:{
                name: "",
                description: "",
                members: "",
                hours: 0,
                start: 0,
                duration: 0,
                nameInvalid: false,
                descriptionInvalid: false,
                membersInvalid: false,
                hoursInvalid: false,
                startInvalid: false,
                durationInvalid: false
            }
        })
    });
  }

  componentDidMount() {
    this.loadProjectData();
  }

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

  changeHours = (e) => {
    this.setState({
      ...this.state, 
      formData:{
        ...this.state.formData,
        hours: parseInt(e.target.value),
        hoursInvalid: false
      }
    });
  };

  changeStart = (e) => {
    this.setState({
      ...this.state, 
      formData:{
        ...this.state.formData,
        start: parseInt(e.target.value),
        startInvalid: false
      }
    });
  };

  changeDuration = (e) => {
    this.setState({
      ...this.state, 
      formData:{
        ...this.state.formData,
        duration: parseInt(e.target.value),
        durationInvalid: false
      }
    });
  };

  handleSubmit = (event) => {
    let nameInvalid = false;
    let descriptionInvalid = false;
    let membersInvalid = false;
    let hoursInvalid = false;
    let startInvalid = false;
    let durationInvalid = false;
    if(this.state.formData.name.length === 0) nameInvalid = true;
    if(this.state.formData.description.length === 0) descriptionInvalid = true;
    if(this.state.formData.members.length === 0) membersInvalid = true;
    if(this.state.formData.hours <= 0) hoursInvalid = true;
    if(this.state.formData.start <= 0) startInvalid = true;
    if(this.state.formData.duration <= 0) durationInvalid = true;
    let members = this.state.formData.members;
    members = members.replace(/ /g,'');
    let membersList = [];
    members.split(";").forEach(m => {
        membersList.push({
            contributions: 0,
            email: m,
            hours: 0
        })
    });
    let membersSet = new Set(this.state.project.members);
    membersList.forEach(m => {
        if(!membersSet.has(m.email))
            membersInvalid = true;
    });
    if(nameInvalid || descriptionInvalid || membersInvalid || hoursInvalid || startInvalid || durationInvalid){
      this.setState({
        ...this.state, 
        formData:{
          ...this.state.formData,
          nameInvalid: nameInvalid,
          descriptionInvalid: descriptionInvalid,
          membersInvalid: membersInvalid,
          hoursInvalid: hoursInvalid,
          startInvalid: startInvalid,
          durationInvalid: durationInvalid
        }
      });
      return;
    }
    let taskId;
    let tasks;
    if(this.state.project.tasks){
        taskId = this.state.project.tasks.length;
        tasks = this.state.project.tasks;
    }
    else{
        taskId = 0;
        tasks = {};
    }
    tasks[taskId] = {
        collaborators: membersList,
        description: this.state.formData.description,
        duration: this.state.formData.duration,
        hours: this.state.formData.hours,
        id: taskId,
        name: this.state.formData.name,
        start: this.state.formData.start
    }
    let key = '/' + this.props.profile.googleId + '/' + this.props.projectId + '/tasks';
    Firebase.database().ref(key).set(tasks);
    window.location.assign('./project');
  };

  render() {
    if(!this.props.projectId)
      window.location.assign('./home');
    if(Object.keys(this.state).length === 0)
      return <LoadingSpinner/>;
    return (
      <div>
        <NavigationBar returnProject={true}/>  
        <Container fluid>
          <br/>
          <Row className="justify-content-center">
            New Task.
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
                            Please provide a name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholder="Enter description" 
                                      required isInvalid={this.state.formData.descriptionInvalid}
                                      onChange={e => this.changeDescription(e)}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="members">
                        <Form.Label>Collaborators</Form.Label>
                        <Form.Control placeholder="Enter collaborators email separated by ;"
                                      required isInvalid={this.state.formData.membersInvalid}
                                      onChange={e => this.changeMembers(e)}/>
                        <Form.Control.Feedback type="invalid">
                            Invalid collaborators list.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="HourSelect">
                        <Form.Label>Total number of hours needed to complete the task</Form.Label>
                        <Form.Control placeholder="Hours" type="number" 
                                      onChange={e => this.changeHours(e)}
                                      required isInvalid={this.state.formData.hoursInvalid}
                                      />
                        <Form.Control.Feedback type="invalid">
                            Number of hours must be greater than 0.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="start">
                            <Form.Label>Start week</Form.Label>
                            <Form.Control type="number" placeholder="Start week" 
                                          required isInvalid={this.state.formData.startInvalid}
                                          onChange={e => this.changeStart(e)}/>
                            <Form.Control.Feedback type="invalid">
                                Invalid start week.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="duration">
                            <Form.Label>Duration in weeks</Form.Label>
                            <Form.Control type="number" required isInvalid={this.state.formData.durationInvalid}
                                          onChange={e => this.changeDuration(e)}
                                          placeholder="Number of weeks for the task" />
                            <Form.Control.Feedback type="invalid">
                                Invalid duration.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
