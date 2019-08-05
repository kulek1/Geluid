import { OPEN_SETTINGS, CLOSE_SETTINGS, AppAction } from './types';

export const openSettings = (): AppAction => ({
  type: OPEN_SETTINGS
});

export const closeSettings = (): AppAction => ({
  type: CLOSE_SETTINGS
});
