import React, { Component } from 'react';
import MainPlayer from '../components/MainPlayer';
import Socket from '../helpers/socket';

class ClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSocketInit: false
    };
  }

  componentDidMount() {
    ['click', 'touchend'].map((e) => this.mainButton.addEventListener(e, () => {
      if (this.state.isSocketInit) return;

      console.log('unlocking...');
      this.setState({ isSocketInit: true });
      // Socket.unlockMobileSafari();
      Socket.bindSockets();
      Socket.initAudioTag();
    }));
  }

  render() {
    return (
      <div className="container container__client">
        <div className="client__connect">
          <button
            type="button"
            className="btn btn-primary"
            ref={(btn) => { this.mainButton = btn; }}
          >
          Connect to Server
          </button>
        </div>
        <div className="client__player">
          <MainPlayer />
        </div>
      </div>
    );
  }
}

export default ClientView;
