import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SidePicker from '../views/SidePicker';
import ClientView from '../views/ClientView';
import HostView from '../views/HostView';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={SidePicker} />
          <Route path="/client" component={ClientView} />
          <Route path="/host" component={HostView} />
        </div>
      </Router>
    );
  }
}

export default App;
