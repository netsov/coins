export const toggleSelected = type => itemId => {
  return {
    type,
    itemIds: [itemId],
  };
};

export const toggleSelectAll = (typeClear, typeToggle, reducerName) => () => (
  dispatch,
  getState
) => {
  const { [reducerName]: {items, selected} } = getState();
  if (selected.length === items.length) {
    dispatch({
      type: typeClear,
    });
  } else {
    dispatch({
      type: typeToggle,
      itemIds: items
        .filter(item => !selected.includes(item.__id))
        .map(p => p.__id),
    });
  }
};
