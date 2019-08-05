import { OPEN_SETTINGS, CLOSE_SETTINGS } from '../actions/actionTypes';

type actionType = {
  type: string;
};

const defaultState = {
  isSettingsDialog: false
};

const app = (state = defaultState, action: actionType) => {
  switch (action.type) {
    case OPEN_SETTINGS:
      return { ...state, isSettingsDialog: true };
    case CLOSE_SETTINGS:
      return { isSettingsDialog: false };

    default:
      return state;
  }
};

export default app;
