// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { ipcRenderer } from 'electron';
import styles from './styles.scss';
import customSelectStyle from './StyledSelect';

type Props = {
  audioDevices: array
};

const placeholder = (
  <span>
    <span className={customSelectStyle.circleGreen} />
    Select audio device
  </span>
);

class AudioSelect extends Component<Props> {
  props: Props;

  state = {
    selectedOption: ''
  };

  updateValue = value => {
    this.setState({
      selectedOption: value
    });
    this.sendSelectedAudioDeviceId(value.value);
  };

  sendSelectedAudioDeviceId = deviceId =>
    ipcRenderer.send('client-audio-devices', deviceId);

  render() {
    const { audioDevices } = this.props;
    const { selectedOption } = this.state;
    const devices = audioDevices.map(item => ({
      label: item.name,
      value: item.id
    }));

    return (
      <div className={styles.container}>
        <h5 className={styles.heading}>Select audio input</h5>
        <Select
          isLoading={audioDevices.length === 0}
          name="form-field-name"
          value={selectedOption}
          options={devices}
          onChange={this.updateValue}
          styles={customSelectStyle}
          maxMenuHeight={150}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ server }) => ({
  audioDevices: server.audioDevices,
  status: server.status
});

export default connect(mapStateToProps)(AudioSelect);
