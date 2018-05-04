export function storeToLocalStorage(key, value, serialize = true) {
  const storage = window.localStorage;
  if (serialize) value = JSON.stringify(value);
  storage.setItem(key, value);
}

export function getFromLocalStorage(key, deserialize = true) {
  const storage = window.localStorage;
  let result = storage.getItem(key);
  if (result && deserialize) result = JSON.parse(result);
  return result;
}

export const getItems = key => {
  return getFromLocalStorage(key) || [];
};

export const getItem = key => itemId => {
  return getItems(key).find(p => p.__id === itemId);
};

export const updateItem = key => item => {
  storeToLocalStorage(key, [
    ...getItems(key).filter(p => p.__id !== item.__id),
    item,
  ]);
};

export const deleteItems = key => ids => {
  ids = Array.isArray(ids) ? ids : [ids];
  let items = getItems(key);
  items = items.filter(p => !ids.includes(p.__id));
  storeToLocalStorage(key, items);
};

export const updateTickerData = coins => {
  storeToLocalStorage('ticker', coins);
};

export const getAuthNotificationFlag = () => {
  return getFromLocalStorage('authNotificationFlag', false);
};

export const setAuthNotificationFlag = value => {
  return storeToLocalStorage('authNotificationFlag', value, false);
};
