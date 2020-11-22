import React from "react";
import {
    Spinner
} from "react-bootstrap";

class LoadingSpinner extends React.Component {
  render() {
  	return(
      <Spinner animation="border" role="status" 
               style={{position: 'absolute', left: '50%', top: '50%'}}>
          <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
}

export default LoadingSpinner;