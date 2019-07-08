// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { ipcRenderer } from 'electron';
import styles from './styles.scss';
import customSelectStyle from './StyledSelect';

const placeholder = (
  <span>
    <span className={customSelectStyle.circleGreen} />
    Select audio device
  </span>
);

const AudioSelect = ({ audioDevices }: Props) => {
  const [selectedOption, setSelectedOption] = useState('');

  const sendSelectedAudioDeviceId = deviceId =>
    ipcRenderer.send('client-audio-devices', deviceId);

  function updateValue(value) {
    setSelectedOption(value);
    sendSelectedAudioDeviceId(value.value);
  }

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
        onChange={updateValue}
        styles={customSelectStyle}
        maxMenuHeight={150}
        placeholder={placeholder}
      />
    </div>
  );
};

const mapStateToProps = ({ server }) => ({
  audioDevices: server.audioDevices,
  status: server.status
});

export default connect(mapStateToProps)(AudioSelect);
