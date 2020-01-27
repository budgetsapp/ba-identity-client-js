var storage = {};

var inMemoryStorage = {
  getItem: key => {
    return storage[key];
  },
  setItem: (key, value) => {
    storage[key] = value;
    // console.log('Storage', storage);
  },
  removeItem: key => {
    delete storage[key];
    // console.log('Storage', storage);
  },
};

module.exports = inMemoryStorage;
