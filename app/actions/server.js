// @flow
export const SET_STATUS = 'SET_STATUS';
export const SET_IP_ADDRESS = 'SET_IP_ADDRESS';
export const SET_LISTENERS_COUNT = 'SET_LISTENERS_COUNT';
export const SET_AUDIO_DEVICES = 'SET_AUDIO_DEVICES';

export function setStatus(status: string) {
  return {
    type: SET_STATUS,
    payload: status,
  };
}

export function setIpAddress(ipAddress: string) {
  return {
    type: SET_IP_ADDRESS,
    payload: ipAddress,
  };
}

export function setListenersCount(listenersCount: number) {
  return {
    type: SET_LISTENERS_COUNT,
    payload: listenersCount
  };
}

export function setAudioDevices(audioDevices: Array<object>) {
  return {
    type: SET_AUDIO_DEVICES,
    payload: audioDevices
  };
}

