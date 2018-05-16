// @flow
import { SET_STATUS, SET_IP_ADDRESS, SET_LISTENERS_COUNT, SET_AUDIO_DEVICES } from '../actions/server';
import { EN_INITIALIZATION } from '../translations/status';

type actionType = {
  +type: string
};

export type counterStateType = {
  +status: string
};

const defaultState = {
  status: EN_INITIALIZATION,
  ipAddress: '127.0.0.1',
  listenersCount: 0,
  audioDevices: [],
};

export default function server(state: array = defaultState, action: actionType) {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, status: action.payload };

    case SET_IP_ADDRESS:
      return { ...state, ipAddress: action.payload };

    case SET_LISTENERS_COUNT:
      return { ...state, listenersCount: action.payload };

    case SET_AUDIO_DEVICES:
      return { ...state, audioDevices: action.payload };

    default:
      return state;
  }
}
