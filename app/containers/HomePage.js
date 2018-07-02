// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './HomePage.scss';
import ActiveListeners from '../components/ActiveListeners';
import ServerStatus from '../components/ServerStatus';
import AudioSelect from '../components/AudioSelect';
import SettingsDialog from '../components/SettingsDialog';

type Props = {
  isSettingsDialog: boolean
};

class HomePage extends Component<Props> {
  props: Props;

  render() {
    const { isSettingsDialog } = this.props;

    return (
      <div className={styles.container}>
        <h3 className="app-title">Streaming-Server</h3>
        <div className={styles.container__boxes}>
          <ActiveListeners />
          <ServerStatus />
        </div>
        <div className={styles.container__select}>
          <AudioSelect />
        </div>
        { isSettingsDialog ? <SettingsDialog /> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSettingsDialog: state.app.isSettingsDialog,
});

export default connect(mapStateToProps)(HomePage);
