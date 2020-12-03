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
import {Bar, Doughnut, Pie} from 'react-chartjs-2';
import crypto from 'crypto';

class Charts extends React.Component {
    state = {
        chart1Show: false,
        chart2Show: false,
        chart3Show: false
    }

    hex_color_from_string = (s) => {
        let hashPwd = crypto.createHash('sha1').update(s).digest('hex');
        return '#' + hashPwd.slice(0, 6);
    };

    handleCloseChart1 = () => this.setState({...this.state, chart1Show: false});
    handleShowChart1 = () => this.setState({...this.state, chart1Show: true});
    getChart1Data = () => {
        let members = {};
        this.props.projectData.members.forEach(m => members[m] = 0);
        this.props.projectData.tasks.forEach(t => t.collaborators.forEach(c => members[c.email] += c.hours));

        return {
            labels: Object.keys(members),
            datasets: [{
                label: 'Hours worked',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: Object.values(members)
            }]
        }
    }

    handleCloseChart2 = () => this.setState({...this.state, chart2Show: false});
    handleShowChart2 = () => this.setState({...this.state, chart2Show: true});
    getChart2Data = () => {
        let members = {};
        let colors = {};
        this.props.projectData.members.forEach(m =>{
            members[m] = 0;
            colors[m] = this.hex_color_from_string(m);
        });
        this.props.projectData.tasks.forEach(t =>t.collaborators.forEach(c => members[c.email] += c.contributions))

        return {
            labels: Object.keys(members),
            datasets: [{
                label: 'Contributions',
                backgroundColor: Object.values(colors),
                hoverBackgroundColor: Object.values(colors),
                data: Object.values(members)
            }]
        }
    }


    handleCloseChart3 = () => this.setState({...this.state, chart3Show: false});
    handleShowChart3 = () => this.setState({...this.state, chart3Show: true});
    getChart3Data = () => {
        let data = {missing: 0, completed: 0};
        let total = 0;
        this.props.projectData.tasks.forEach(t =>{
            t.collaborators.forEach(c => data.completed += c.hours);
            total += t.hours;
        });
        data.missing = total - data.completed;
        return {
            labels: Object.keys(data),
            datasets: [{
                label: 'Total Progress',
                backgroundColor: Object.values({missing: "FFFFCC", completed: "#CCEEDD"}),
                hoverBackgroundColor: Object.values({missing: "FFFFCC", completed: "#CCEEDD"}),
                data: Object.values(data)
            }]
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
                                                    },
                                                    scales: {
                                                        xAxes: [{
                                                            barThickness : 15
                                                        }],
                                                        yAxes: [{
                                                            ticks: {
                                                                beginAtZero: true
                                                            }
                                                        }]
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
                                <p>Contributions</p>
                            </Row>
                            <Row className="justify-content-center" >
                                <Button className="cake-chart" onClick={this.handleShowChart2}/>
                                <Modal show={this.state.chart2Show} onHide={this.handleCloseChart2}>
                                    <Modal.Header closeButton>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="chart-div">
                                            <Pie
                                                height={200}
                                                data={this.getChart2Data}
                                                options={{
                                                        title:{
                                                        display:true,
                                                        text:'Contributions per Collaborator',
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
                    </Row>
                    <br/>
                    <Row>
                        <Col xs={6} md={6} lg={6} >
                            <Row className="justify-content-center">
                                <p>Total progress</p>
                            </Row>
                            <Row className="justify-content-center" >
                                <Button className="donut-chart" onClick={this.handleShowChart3}/>
                                <Modal show={this.state.chart3Show} onHide={this.handleCloseChart3}>
                                    <Modal.Header closeButton>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="chart-div">
                                            <Doughnut
                                                height={200}
                                                data={this.getChart3Data}
                                                options={{
                                                        title:{
                                                        display:true,
                                                        text:'Total Progress',
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