import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  state = {
  };

  render() {
    return (
      <p>HELLO Mr</p>
    );
  }
}

const mapStateToProps = state => ({
    ...state
});
  
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);