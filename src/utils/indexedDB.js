import localforage from 'localforage';

async function storeToIndexedDB(key, value, serialize = true) {
  if (serialize) value = JSON.stringify(value);
  await localforage.setItem(key, value);
}

export async function getFromIndexedDB(key, deserialize = true) {
  let result = await localforage.getItem(key);
  if (result && deserialize) result = JSON.parse(result);
  return result;
}

export async function updatHisto(key, data) {
  await storeToIndexedDB(key, data);
}
