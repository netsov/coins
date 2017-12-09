function storeToLocalStorage(key, value) {
  const storage = window.localStorage;
  storage.setItem(key, JSON.stringify(value));
}

export function getPositions() {
  const storage = window.localStorage;
  let positions = storage.getItem('positions');
  positions = positions ? JSON.parse(positions) : [];
  return positions;
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
