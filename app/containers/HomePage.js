// @flow
import React, { Component } from 'react';
import ActiveListeners from '../components/ActiveListeners';
import ServerStatus from '../components/ServerStatus';
import AudioSelect from '../components/AudioSelect';

class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container">
        <h3 className="app-title">Streaming-Server</h3>
        <div className="container__boxes">
          <ActiveListeners />
          <ServerStatus />
        </div>
        <div className="container__select">
          <AudioSelect />
        </div>
      </div>
    );
  }
}

export default HomePage;
