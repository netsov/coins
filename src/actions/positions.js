export const GET_STORED_POSITIONS = 'GET_STORED_POSITIONS';
export const STORE_POSITION = 'STORE_POSITION';

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
