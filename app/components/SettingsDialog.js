// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {};

class SettingsDialog extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>Dialog</div>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(SettingsDialog);
