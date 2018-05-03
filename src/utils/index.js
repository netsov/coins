import * as storage from '../utils/localStorage';
import { firebaseDB } from '../utils/firebase';

export * from './cryptocompare';

export function getTimestamp() {
  return Math.ceil(new Date().valueOf() * 0.001);
}

export function isExpired(ts, minutes) {
  const now = getTimestamp();
  const ageMinutes = (now - ts) / 60;
  return ageMinutes > minutes;
}

export function formatFloat(value, digits = 8) {
  if (!value) return 0;
  value = parseFloat(value);
  value = digits ? value.toFixed(digits) : Math.floor(value);
  return value;
}

export const normalize = items =>
  items.reduce((result, item) => ({ ...result, [item.__id]: item }), {});

export async function syncLocalStorageWithFirebase(user) {
  console.log('syncing with firebase');
  await Promise.all(
    ['watchlist', 'positions'].map(reducerName =>
      firebaseDB
        .ref(`${user.uid}/${reducerName}`)
        .set(normalize(storage.getItems(reducerName)))
    )
  );
}
