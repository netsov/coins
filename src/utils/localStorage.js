export function storeToLocalStorage(key, value) {
  const storage = window.localStorage;
  storage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
  const storage = window.localStorage;
  let result = storage.getItem(key);
  return result && JSON.parse(result);
}

export const getItems = key => {
  return getFromLocalStorage(key) || [];
}

export const getItem = key => (itemId) => {
  return getItems(key).find(p => p.__id === itemId);
}

export const updateItem = key => item => {
  storeToLocalStorage(
    key,
    [...getItems(key).filter(p => p.__id !== item.__id), item]
  );
};

export const deleteItems = key => (ids) => {
  ids = Array.isArray(ids) ? ids : [ids];
  let items = getItems(key);
  items = items.filter(p => !ids.includes(p.__id));
  storeToLocalStorage(key, items);
}

// export const updateSettings = (key, value) => {
//   storeToLocalStorage('settings', { ...getSettings(), [key]: value });
// };

export const updatHisto = (key, data) => {
  storeToLocalStorage(key, data);
};

export const updateTickerData = coins => {
  storeToLocalStorage('ticker', coins);
};