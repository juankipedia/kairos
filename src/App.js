import React from 'react';
import './App.css';
import Main from './Main/Main';
import Home from './Home/Home';
import Project from './Project/Project'
import AddProgress from './AddProgress/AddProgress'
import Create from './Create/Create'
import Firebase from 'firebase/app';
import "firebase/database"
import config from './config';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends React.Component {
  constructor(props){
    super(props);
    Firebase.initializeApp(config);
    this.state = {}
  }
  render(){
    return (
      <div className="App">
          <Router>
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/project">
                <Project />
              </Route>
              <Route path="/progress">
                <AddProgress/>
              </Route>
              <Route path="/create">
                <Create/>
              </Route>
              <Route path="/">
                <Main />
              </Route>
            </Switch>
          </Router>
      </div>
    );  
  }
}

export default App;