import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Col,
  Row
} from "react-bootstrap";
import "./Charts.css";
import {Bar} from 'react-chartjs-2';

class Charts extends React.Component {
    state = {
        labels: ['January', 'February', 'March',
                    'April', 'May'],
        datasets: [
            {
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
            }
        ]
    }

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col xs={6} md={6} lg={6} >
                <div className="chart-div">
                    <Bar
                        height={150}
                        data={this.state}
                        options={{
                                title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    />
                </div>
            </Col>
            <Col xs={6} md={6} lg={6} >
                <div className="chart-div">
                    <Bar
                        height={150}
                        data={this.state}
                        options={{
                                title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    />
                </div>
            </Col>  
          </Row>
          <Row>
            <Col xs={6} md={6} lg={6} >
                <div className="chart-div">
                    <Bar
                        height={150}
                        data={this.state}
                        options={{
                                title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    />
                </div>
            </Col>
            <Col xs={6} md={6} lg={6} >
                <div className="chart-div">
                    <Bar
                        height={150}
                        data={this.state}
                        options={{
                                title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    />
                </div>
            </Col>  
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
  
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);