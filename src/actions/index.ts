import {
  SET_STATUS,
  SET_IP_ADDRESS,
  SET_LISTENERS_COUNT,
  SET_AUDIO_DEVICES,
  OPEN_SETTINGS,
  CLOSE_SETTINGS
} from './actionTypes';

export const openSettings = () => ({
  type: OPEN_SETTINGS
});

export const closeSettings = () => ({
  type: CLOSE_SETTINGS
});

export const setStatus = (status: string) => ({
  type: SET_STATUS,
  payload: status
});

export const setIpAddress = (ipAddress: string) => ({
  type: SET_IP_ADDRESS,
  payload: ipAddress
});

export const setListenersCount = (listenersCount: number) => ({
  type: SET_LISTENERS_COUNT,
  payload: listenersCount
});

export const setAudioDevices = (audioDevices: Array<object>) => ({
  type: SET_AUDIO_DEVICES,
  payload: audioDevices
});
