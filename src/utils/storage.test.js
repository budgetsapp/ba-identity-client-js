import { Storage } from './storage';

let _storage = {};
const inMemoryStorage = {
  getItem: key => {
    return _storage[key];
  },
  setItem: (key, value) => {
    _storage[key] = value;
  },
  removeItem: key => {
    delete _storage[key];
  },
};

let storage;

describe('storage', () => {
  beforeEach(() => {
    _storage = {};
    storage = new Storage(inMemoryStorage);
  });

  test('should set item correctly', () => {
    const key = 'itemKey';
    const value = 'itemValue';
    storage.setItem(key, value);
    const valueFromStorage = _storage[key];
    expect(valueFromStorage).toBe(value);
  });

  test('should set array of items correctly', () => {
    const items = [
      {
        key: 'item1Key',
        value: 'item1Value',
      },
      {
        key: 'item2Key',
        value: 'item2Value',
      },
    ];
    storage.setItems(items);
    expect(_storage[items[0].key]).toBe(items[0].value);
    expect(_storage[items[1].key]).toBe(items[1].value);
  });

  test('should get item correctly', () => {
    const key = 'itemKey';
    const value = 'itemValue';
    _storage[key] = value;
    const valueFromStorage = storage.getItem(key);
    expect(valueFromStorage).toBe(value);
  });

  test('should get default item correctly', () => {
    const key = 'itemKey';
    const defaultValue = 'defaultItemValue';
    const valueFromStorage = storage.getItem(key, defaultValue);
    expect(valueFromStorage).toBe(defaultValue);
  });

  test('should remove item correctly', () => {
    const key = 'itemKey';
    const value = 'itemValue';
    storage.setItem(key, value);
    expect(storage.getItem(key)).toBe(value);

    storage.removeItem(key);
    expect(storage.getItem(key)).not.toBeDefined();
  });

  test('should remove array of items correctly', () => {
    const items = [
      {
        key: 'item1Key',
        value: 'item1Value',
      },
      {
        key: 'item2Key',
        value: 'item2Value',
      },
    ];
    storage.setItems(items);
    expect(storage.getItem(items[0].key)).toBe(items[0].value);
    expect(storage.getItem(items[1].key)).toBe(items[1].value);

    storage.removeItems(items.map(i => i.key));
    expect(storage.getItem(items[0].key)).not.toBeDefined();
    expect(storage.getItem(items[1].key)).not.toBeDefined();
  });
});
