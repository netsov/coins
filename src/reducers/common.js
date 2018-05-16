import * as actions from '../actions';

export const itemsReducerCreator = module => (state = [], action) => {
  switch (action.type) {
    case module.DELETE_ITEMS_SUCCESS:
      return state.filter(p => !action.ids.includes(p.__id));
    case module.GET_ITEMS_SUCCESS:
      return action.items;
    case module.UPDATE_ITEM_SUCCESS:
      const isNew = !state.find(p => p.__id === action.item.__id);
      return isNew
        ? [action.item, ...state]
        : state.map(p => (p.__id === action.item.__id ? action.item : p));
    case actions.GET_HISTO_REQUEST:
      return state.map(
        p => (p.__id === action.__id ? { ...p, loading: true } : p)
      );
    case actions.GET_HISTO_SUCCESS:
      return state.map(
        p => (p.__id === action.__id ? { ...p, loading: false } : p)
      );

    default:
      return state;
  }
};

export const fetchingReducerCreator = module => (state = false, action) => {
  switch (action.type) {
    case module.GET_ITEMS_REQUEST:
      return true;
    case module.GET_ITEMS_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const updatingReducerCreator = module => (state = false, action) => {
  switch (action.type) {
    case module.UPDATE_ITEMS_REQUEST:
      return true;
    case module.UPDATE_ITEMS_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const deletingReducerCreator = module => (state = false, action) => {
  switch (action.type) {
    case module.DELETE_ITEMS_REQUEST:
      return true;
    case module.DELETE_ITEMS_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const selectedReducerCreator = module => (state = [], action) => {
  switch (action.type) {
    case module.DELETE_ITEMS_SUCCESS:
    case module.CLOSE_EDITOR:
    case module.CLEAR_SELECTED:
      return [];
    case module.TOGGLE_SELECTED:
      const filtered = state.filter(itemId => !action.itemIds.includes(itemId));
      return filtered.length === state.length
        ? [...action.itemIds, ...filtered]
        : filtered;
    default:
      return state;
  }
};

export const formItemReducerCreator = module => (state = null, action) => {
  switch (action.type) {
    case module.OPEN_EDITOR:
      return action.item;
    case module.CLOSE_EDITOR:
    case module.UPDATE_ITEM_SUCCESS:
      return null;
    default:
      return state;
  }
};
