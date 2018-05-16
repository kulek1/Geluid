// @flow
import React, { Component } from 'react';
import styles from './HomePage.scss';
import ActiveListeners from '../components/ActiveListeners';
import ServerStatus from '../components/ServerStatus';
import AudioSelect from '../components/AudioSelect';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
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
      </div>
    );
  }
}