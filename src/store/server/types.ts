export const SET_STATUS = 'SET_STATUS';
export const SET_IP_ADDRESS = 'SET_IP_ADDRESS';
export const SET_LISTENERS_COUNT = 'SET_LISTENERS_COUNT';
export const SET_AUDIO_DEVICES = 'SET_AUDIO_DEVICES';

export interface ServerAction {
  type:
    | typeof SET_STATUS
    | typeof SET_IP_ADDRESS
    | typeof SET_LISTENERS_COUNT
    | typeof SET_AUDIO_DEVICES;
  payload: any;
}
