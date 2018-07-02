// @flow
import { OPEN_SETTINGS, CLOSE_DIALOG } from '../actions/actionTypes';

type actionType = {
  +type: string
};

const defaultState = {
  isSettingsDialog: false,
};

const app = (state: array = defaultState, action: actionType) => {
  switch (action.type) {
    case OPEN_SETTINGS:
      return { ...state, isSettingsDialog: true };
    case CLOSE_DIALOG:
      return { ...state, isSettingsDialog: false };

    default:
      return state;
  }
};

export default app;
