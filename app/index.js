var BaAuthApiClient = require('../dist/ba-auth-api-client');
var inMemoryStorage = require('./inMemoryStorage');

var URL = 'http://127.0.0.1:5011';
var client = new BaAuthApiClient(URL, {
  storage: inMemoryStorage,
});

// try {
//   client.refreshToken();
//   console.log('Response', client.refreshToken());
// } catch (e) {
//   console.log('Error');
// }

var done = false;

(function wait() {
  if (!done) setTimeout(wait, 1000);
})();

// for testing purposes
global.fetch = require('node-fetch');

client
  .login('ba-user-1', 'ba-password')
  .then(res => {
    console.log(res);
    done = true;
  })
  .catch(e => {
    console.log('Error', e);
  });
