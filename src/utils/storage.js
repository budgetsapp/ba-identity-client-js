export class Storage {
  constructor(storage) {
    this._storage = storage || localStorage;
  }

  setItem(key, value) {
    this._storage.setItem(key, value);
  }

  setItems(items) {
    items.forEach(item => {
      this.setItem(item.key, item.value);
    });
  }

  getItem(key, defaultValue) {
    const value = this._storage.getItem(key);
    return !!value ? value : defaultValue;
  }

  removeItem(key) {
    this._storage.removeItem(key);
  }

  removeItems(keys) {
    keys.forEach(key => {
      this.removeItem(key);
    });
  }
}
