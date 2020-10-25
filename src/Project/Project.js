import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  ListGroup
} from "react-bootstrap";
import NavigationBar from "../Nav/NavigationBar"
import './Project.css'

class Project extends React.Component {
  state = {
    "id": 12131,
    "name": "project 1",
    "description": "this is a nice project",
    "start": 1231234321,
    "tasks":[
        {
            "id": 21321,
            "name": "task1",
            "description": "this is a really simple task",
            "collaborators":[
                {
                    "email":"jmoron@unal.edu.co",
                    "hours": 213
                }, 
                {
                    "email": "jmoron2@unal.edu.co",
                    "hours": 2121
                }
            ],
            "start": 123123134,
            "duration": 2,
            "hours": 23423
        },
        {
          "id": 21321,
          "name": "task1",
          "description": "this is a really simple task",
          "collaborators":[
              {
                  "email":"jmoron@unal.edu.co",
                  "hours": 213
              }, 
              {
                  "email": "jmoron2@unal.edu.co",
                  "hours": 2121
              }
          ],
          "start": 123123134,
          "duration": 2,
          "hours": 23423
      },
      {
        "id": 21321,
        "name": "task1",
        "description": "this is a really simple task",
        "collaborators":[
            {
                "email":"jmoron@unal.edu.co",
                "hours": 213
            }, 
            {
                "email": "jmoron2@unal.edu.co",
                "hours": 2121
            }
        ],
        "start": 123123134,
        "duration": 2,
        "hours": 23423
      },
      {
        "id": 21321,
        "name": "task1",
        "description": "this is a really simple task",
        "collaborators":[
            {
                "email":"jmoron@unal.edu.co",
                "hours": 213
            }, 
            {
                "email": "jmoron2@unal.edu.co",
                "hours": 2121
            }
        ],
        "start": 123123134,
        "duration": 2,
        "hours": 23423
      }
    ],
    "members":["jmoron@unal.edu.co", "jmoron2@unal.edu.co", "jmoron3@unal.edu.co"]
  };

  createTaskListResume = () => {
    var items = []
    for(var i = 0; i < this.state.tasks.length; i++ ) {
      items.push(
        <ListGroup.Item className="task-resume-item">
          {this.state.tasks[i].name + "  / X%"}
        </ListGroup.Item>);
    }
    return (
      <ListGroup className="tasks-resume">
        {items}
      </ListGroup>
    );
  }

  render() {
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
                  <Card.Subtitle className="mb-2 text-muted">Day number X of week Y</Card.Subtitle>
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
            <Col xs={4} md={4} lg={4} style={{backgroundColor:"blue"}}>
              column 3
            </Col>
            <Col xs={8} md={8} lg={8} style={{backgroundColor:"black"}}>
              column 4
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