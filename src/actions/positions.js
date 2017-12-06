export const GET_STORED_POSITIONS = 'GET_STORED_POSITIONS';
export const STORE_POSITION = 'STORE_POSITION';
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const OPEN_EDITOR = 'OPEN_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_EDITOR';

function getPositionsFromLocalStorage() {
  const storage = window.localStorage;
  let positions = storage.getItem('positions');
  positions = positions ? JSON.parse(positions) : [];
  return positions;
}

function savePositionsToLocalStorage(positions) {
  const storage = window.localStorage;
  storage.setItem('positions', JSON.stringify(positions));
}

export const getPositions = () => {
  const positions = getPositionsFromLocalStorage();
  return {
    type: GET_STORED_POSITIONS,
    positions,
  };
};

export const savePosition = position => {
  let positions = getPositionsFromLocalStorage();
  const existing = positions.find(p => p.__id === position.__id);
  positions = existing
    ? positions.map(p => (p.__id === position.__id ? position : p))
    : [position, ...positions];
  savePositionsToLocalStorage(positions);

  return {
    type: STORE_POSITION,
    positions,
  };
};

export const deletePosition = positionId => {
  let positions = getPositionsFromLocalStorage();
  positions = positions.filter(p => p.__id !== positionId);
  savePositionsToLocalStorage(positions);

  return {
    type: STORE_POSITION,
    positions,
  };
};

export const toggleSelected = positionId => {
  return {
    type: TOGGLE_SELECTED,
    positionId,
  };
};

export const openEditor = positionId => {
  const position = positionId
    ? getPositionsFromLocalStorage().find(p => p.__id === positionId)
    : {};
  return {
    type: OPEN_EDITOR,
    position,
  };
};

export const closeEditor = () => {
  return {
    type: CLOSE_EDITOR,
  };
};
