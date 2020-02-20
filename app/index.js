var BaIdentityClient = require('../dist');
var inMemoryStorage = require('./inMemoryStorage');

var client = new BaIdentityClient({
  storage: inMemoryStorage,
  serverUrl: 'http://127.0.0.1:5011',
  refreshInterval_MS: 5000,
  tokensUpdatedCallback: data => {
    console.log(data);
  },
});

// try {
//   client.autoUpdateToken();
// } catch (e) {
//   console.log('Error', e);
// }

var done = false;

(function wait() {
  if (!done) setTimeout(wait, 1000);
})();

// for testing purposes
global.fetch = require('node-fetch');

client
  .login('ba-user-1', 'ba-password')
  .then(() => {
    // done = true;
  })
  .catch(e => {
    console.log('Error', e);
  });
