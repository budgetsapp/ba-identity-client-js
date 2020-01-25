var BaAuthApiClient = require('../dist/ba-auth-api-client');

var URL = 'https://localhost';
var client = BaAuthApiClient(URL);

console.log('Response', client.hello());
