import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Col,
  Row,
  Button,
  Form
} from "react-bootstrap";
import NavigationBar from "../Nav/NavigationBar";
import Firebase from 'firebase/app';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "firebase/database";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class Create extends React.Component {
  state = {};

  loadProjects = () => {
    let ref = Firebase.database().ref('/' + this.props.profile.googleId + '/projects');
    ref.on('value', snapshot => {
      const state = {
        projects: snapshot.val(), 
        formData:{
          name: "",
          description: "",
          members: "",
          nameInvalid: false,
          descriptionInvalid: false,
          membersInvalid: false
        }
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
    console.log("si pero no")
    let nameInvalid = false;
    let descriptionInvalid = false;
    let membersInvalid = false;
    if(this.state.formData.name.length === 0) nameInvalid = true;
    if(this.state.formData.description.length === 0) descriptionInvalid = true;
    if(this.state.formData.members.length === 0) membersInvalid = true;
    //TODO validate members list by checking emails
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
                    <Button variant="success" onClick={this.handleSubmit}>Create</Button>
                </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Create);
