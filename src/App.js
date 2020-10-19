import React from 'react';
import './App.css';
import Main from './Main/Main';
import Home from './Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/Home">
              <Home />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;