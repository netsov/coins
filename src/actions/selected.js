export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const CLEAR_SELECTED = 'CLEAR_SELECTED';

export const toggleSelected = positionId => {
  return {
    type: TOGGLE_SELECTED,
    positionIds: [positionId],
  };
};

export const toggleSelectAll = () => (dispatch, getState) => {
  const { positions, selected } = getState();
  if (selected.length === positions.length) {
    dispatch({
      type: CLEAR_SELECTED,
    });
  } else {
    dispatch({
      type: TOGGLE_SELECTED,
      positionIds: positions
        .filter(p => !selected.includes(p.__id))
        .map(p => p.__id),
    });
  }
};
