import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { ipcRenderer } from 'electron';
import { ValueType } from 'react-select/src/types';

import { ServerDefaultState } from 'reducers/server';
import styles from './styles.module.scss';
import customSelectStyle from './StyledSelect';

type Props = {
  audioDevices: [];
};

const placeholder: unknown = (
  <span>
    <span className={customSelectStyle.circleGreen} />
    Select audio device
  </span>
);

class AudioSelect extends Component<Props> {
  state = {
    selectedOption: null
  };

  updateValue = (value: ValueType<{ label: any; value: any }>) => {
    this.setState({
      selectedOption: value
    });

    // @ts-ignore
    this.sendSelectedAudioDeviceId(value.value);
  };

  sendSelectedAudioDeviceId = (deviceId: number) =>
    ipcRenderer.send('client-audio-devices', deviceId);

  render() {
    const { audioDevices } = this.props;
    const { selectedOption } = this.state;
    const devices = audioDevices.map((item: any) => ({
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
          placeholder={placeholder as string}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ server }: { server: ServerDefaultState }) => ({
  audioDevices: server.audioDevices,
  status: server.status
});

export default connect(mapStateToProps)(AudioSelect);
