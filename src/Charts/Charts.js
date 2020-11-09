import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Col,
  Row,
  Button,
  Modal
} from "react-bootstrap";
import "./Charts.css";
import {Bar} from 'react-chartjs-2';

class Charts extends React.Component {
    state = {
        chart1Show: false,
        chart2Show: false
    }

    handleCloseChart1 = () => this.setState({chart1Show: false, chart2Show: this.state.chart2Show});
    handleShowChart1 = () => this.setState({chart1Show: true, chart2Show: this.state.chart2Show});
    getChart1Data = () => {
        let members = {}
        this.props.projectData.members.forEach(m => members[m] = 0)
        this.props.projectData.tasks.forEach(t =>
            t.collaborators.forEach(c => members[c.email] += c.hours)
        )
        console.log(members)
        return {
            labels: Object.keys(members),
            datasets: [
                {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: Object.values(members)
                }
            ]
        }
    }

    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col xs={6} md={6} lg={6} >
                            <Row className="justify-content-center">
                                <p>Hours worked per Collaborator</p>
                            </Row>
                            <Row className="justify-content-center" >
                                <Button className="bar-chart" onClick={this.handleShowChart1}/>
                                <Modal show={this.state.chart1Show} onHide={this.handleCloseChart1}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Hours worked per Collaborator</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="chart-div">
                                            <Bar
                                                height={200}
                                                data={this.getChart1Data}
                                                options={{
                                                        title:{
                                                        display:true,
                                                        text:'Hours per Collaborator',
                                                        fontSize:20
                                                    },
                                                    legend:{
                                                        display:true,
                                                        position:'right'
                                                    }
                                                }}
                                            />
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </Row>
                        </Col>
                        <Col xs={6} md={6} lg={6} >
                            <Row className="justify-content-center">
                                <p>Weekly Progress</p>
                            </Row>
                            <Row className="justify-content-center" >
                                <Button className="cake-chart"/>
                            </Row>
                        </Col>  
                    </Row>
                </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
  ...state
});
  
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);