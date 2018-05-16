// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './ServerStatus.scss';
import * as ServerActions from '../actions/server';
import { EN_INITIALIZATION, EN_ERROR, EN_RUNNING } from '../translations/status';

type Props = {
  status: string,
  ipAddress: string
};

class ServerStatus extends Component<Props> {
  props: Props;

  render() {
    const { status, ipAddress } = this.props;

    const classNames = () => [
      'box box__status',
      status === EN_INITIALIZATION ? styles.warning : null,
      status === EN_RUNNING ? styles.success : null,
      status === EN_ERROR ? styles.error : null,
    ].join(' ');

    return (
      <div className={classNames()}>
        <div className="box__content">
          <div className="content__status">
            <p>Status:</p>
            <h3 className={styles.heading}>{status}</h3>
          </div>
          <div className="content__ip">
            <hr className={styles.divider} />
            <p>Your local IP: {ipAddress}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.server.status,
    ipAddress: state.server.ipAddress,
  };
}

export default connect(mapStateToProps)(ServerStatus);
