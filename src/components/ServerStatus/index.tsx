import React from 'react';
import { connect } from 'react-redux';
import cs from 'classnames';
import styles from './styles.module.scss';
import {
  EN_INITIALIZATION,
  EN_ERROR,
  EN_RUNNING
} from '../../translations/status';
import { ServerDefaultState } from '../../reducers/server';

type Props = {
  status: string;
  ipAddress: string;
};

const ServerStatus = ({ status, ipAddress }: Props) => (
  <div
    className={cs('box box__status', {
      [styles.warning]: status === EN_INITIALIZATION,
      [styles.success]: status === EN_RUNNING,
      [styles.error]: status === EN_ERROR
    })}
  >
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

const mapStateToProps = ({ server }: { server: ServerDefaultState }) => ({
  status: server.status,
  ipAddress: server.ipAddress
});

export default connect(mapStateToProps)(ServerStatus);
