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
import Firebase from 'firebase/app';
import "firebase/database"

const stateLoader = new StateLoader();

class Home extends React.Component {
  state = {
  };

  openProject = (id)=>{
    stateLoader.saveState({...this.props, projectId: id});
    window.location.assign('./project')
  }

  loadProjects = () => {
    let ref = Firebase.database().ref('/' + this.props.profile.googleId + '/projects');
    ref.on('value', snapshot => {
      const state = {projects: snapshot.val()};
      this.setState(state)
    });
  }

  componentDidMount() {
    if(this.props.profile === undefined)
      window.location.assign('./');
    this.loadProjects();
  }

  createTaskListResume = () => {
    if(this.state.projects === null)
      return
    var items = []
    Object.keys(this.state.projects).forEach(projectId =>
      items.push(
        <ListGroup.Item key={projectId} action onClick={() => this.openProject(projectId)}>
          {this.state.projects[projectId]}
        </ListGroup.Item>
      )
    )
    return (
      <ListGroup style={{overflowY: "auto", maxHeight: "25em"}}>
        {items}
      </ListGroup>
    );
  }

  render() {
    if(Object.keys(this.state).length === 0)
      return <p> Loading please wait </p>
    return (
      <div>
        <NavigationBar/>
        <Container>
          <Row className="justify-content-center" style={{padding: "2em"}}>
            <Col>
              {this.createTaskListResume()}
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