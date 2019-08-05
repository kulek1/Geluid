export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS';

export interface AppAction {
  type: typeof OPEN_SETTINGS | typeof CLOSE_SETTINGS;
}
