var storage = {};

var inMemoryStorage = {
  getItem: async key => {
    return new Promise(function(resolve) {
      resolve(storage[key]);
    });
  },
  setItem: async (key, value) => {
    return new Promise(function(resolve) {
      storage[key] = value;
      resolve();
    });
    // console.log('Storage', storage);
  },
  removeItem: key => {
    return new Promise(function(resolve) {
      delete storage[key];
      resolve();
    });
    // console.log('Storage', storage);
  },
};

module.exports = inMemoryStorage;
