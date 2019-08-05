import {
  SET_STATUS,
  SET_IP_ADDRESS,
  SET_LISTENERS_COUNT,
  SET_AUDIO_DEVICES,
  ServerAction
} from './types';

export const setStatus = (status: string): ServerAction => ({
  type: SET_STATUS,
  payload: status
});

export const setIpAddress = (ipAddress: string): ServerAction => ({
  type: SET_IP_ADDRESS,
  payload: ipAddress
});

export const setListenersCount = (listenersCount: number): ServerAction => ({
  type: SET_LISTENERS_COUNT,
  payload: listenersCount
});

export const setAudioDevices = (audioDevices: Array<object>): ServerAction => ({
  type: SET_AUDIO_DEVICES,
  payload: audioDevices
});
