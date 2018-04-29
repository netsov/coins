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
