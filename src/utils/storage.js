import config from '../config';

const { appStorageKey } = config;
// use localStorage to store the user info, which might be sent from server in actual project.

export function removeStorage(key = appStorageKey) {
  return localStorage.removeItem(key);
}

export function getStorage(key = appStorageKey) {
  const dataString = localStorage.getItem(key);
  const data = JSON.parse(dataString) || {};
  if (data.expire === false || data.expire >= Date.now()) {
    return data.value;
  }
  removeStorage(key);
  return null;
}

export function setStorage(value, key = appStorageKey, expire = false) {
  if (expire && typeof expire !== 'number') {
    return;
  }
  return localStorage.setItem(
    key,
    JSON.stringify({
      value: typeof value === 'string' ? [value] : value,
      expire: expire === false ? expire : Date.now() + expire,
    }),
  );
}
