export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function getItem(key, defaultValue) {
  const value = localStorage.getItem(key);
  return !!value ? value : defaultValue;
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function removeItems(keys) {
  keys.forEach(key => {
    removeItem(key);
  });
}
