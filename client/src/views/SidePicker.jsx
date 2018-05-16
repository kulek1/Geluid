import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RouteView extends Component {
  render() {
    return (
      <div className="home-page">
        <h3>Select mode:</h3>
        <div className="home-page__buttons">
          <Link to="/client">
            <button className="btn btn-primary">Client</button>
          </Link>
          <Link to="/host">
            <button className="btn btn-secondary">Host</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default RouteView;
