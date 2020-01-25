var BaAuthApiClient = require('../dist/ba-auth-api-client');

var URL = 'https://localhost';
var client = new BaAuthApiClient(URL);

try {
  client.refreshToken();
  console.log('Response', client.refreshToken());
} catch (e) {
  console.log('Error');
}
