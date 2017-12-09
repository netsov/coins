import {defaultSettings} from '../models'

function storeToLocalStorage(key, value) {
  const storage = window.localStorage;
  storage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
  const storage = window.localStorage;
  let result = storage.getItem(key);
  return result && JSON.parse(result);
}

export function getPositions() {
  return getFromLocalStorage('positions') || []
}

export function getPosition(positionId) {
  return getPositions().find(p => p.__id === positionId);
}

export const createPosition = position => {
  storeToLocalStorage('positions', [position, ...getPositions()]);
};

export const updatePosition = position => {
  storeToLocalStorage(
    'positions',
    getPositions().map(p => (p.__id === position.__id ? position : p))
  );
};

export function deletePositions(positionIds) {
  positionIds = Array.isArray(positionIds) ? positionIds : [positionIds];
  let positions = getPositions();
  positions = positions.filter(p => !positionIds.includes(p.__id));
  storeToLocalStorage('positions', positions);
}

export const updateSettings = (key, value) => {
  storeToLocalStorage('settings', {...getSettings(), [key]: value});
};

export function getSettings() {
  return getFromLocalStorage('settings') || defaultSettings
}

