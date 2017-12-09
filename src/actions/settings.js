export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export const openSettings = () => {
  return {
    type: OPEN_SETTINGS,
  };
};

export const closeSettings = () => {
  return {
    type: CLOSE_SETTINGS,
  };
};

export const updateSettings = (key, value) => {
  return {
    type: UPDATE_SETTINGS,
    key,
    value,
  };
};
