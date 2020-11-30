import React from "react";
import { connect } from "react-redux";
import NavigationBar from "../Nav/NavigationBar";
import Firebase from 'firebase/app';
import "firebase/database";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

class CreateTask extends React.Component {
  state = {};

  loadProjectData = () => {
    console.log(this.props);
    let ref = Firebase.database().ref('/' + this.props.profile.googleId + '/' + this.props.projectId);
    ref.on('value', snapshot => {
      const project = snapshot.val();
      this.setState({project: project, formData:{}})
    });
  }

  componentDidMount() {
    this.loadProjectData();
  }


  render() {
    if(!this.props.projectId)
      window.location.assign('./home');
    if(Object.keys(this.state).length === 0)
      return <LoadingSpinner/>;
    return (
      <div>
        <NavigationBar returnProject={true}/>  
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
