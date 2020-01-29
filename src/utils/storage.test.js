import { Storage } from './storage';

let _storage = {};
const inMemoryStorage = {
  getItem: async key => {
    return new Promise(resolve => {
      resolve(_storage[key]);
    });
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

  test('should set item correctly', async () => {
    const key = 'itemKey';
    const value = 'itemValue';
    await storage.setItem(key, value);
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

  test('should not get item if not item saved', async () => {
    const key = 'itemKey';
    const valueFromStorage = await storage.getItem(key);
    expect(valueFromStorage).not.toBeDefined();
  });

  test('should get item correctly', async () => {
    const key = 'itemKey';
    const value = 'itemValue';
    _storage[key] = value;
    const valueFromStorage = await storage.getItem(key);
    expect(valueFromStorage).toBe(value);
  });

  test('should get default item correctly', async () => {
    const key = 'itemKey';
    const defaultValue = 'defaultItemValue';
    const valueFromStorage = await storage.getItem(key, defaultValue);
    expect(valueFromStorage).toBe(defaultValue);
  });

  test('should remove item correctly', async () => {
    const key = 'itemKey';
    const value = 'itemValue';
    await storage.setItem(key, value);
    expect(_storage[key]).toBe(value);

    await storage.removeItem(key);
    expect(_storage[key]).not.toBeDefined();
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
    expect(_storage[items[0].key]).toBe(items[0].value);
    expect(_storage[items[1].key]).toBe(items[1].value);

    storage.removeItems(items.map(i => i.key));
    expect(_storage[items[0].key]).not.toBeDefined();
    expect(_storage[items[1].key]).not.toBeDefined();
  });
});
