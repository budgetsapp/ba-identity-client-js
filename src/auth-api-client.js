import { getTokens } from './services/auth';
import { getFullUrl } from './utils/path';
import { GET_TOKENS_URL } from './const/urls';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './const/storage-keys';
import { Storage } from './utils/storage';
import { parseJwt } from './utils/token';
import { secToMs } from './utils/time';

export class AuthApiClient {
  constructor(serverUrl, options) {
    this.serverUrl = serverUrl;
    this._storage = new Storage(options.storage);
  }

  async _getTokens(login, password) {
    const fullUrl = getFullUrl(this.serverUrl, GET_TOKENS_URL);
    return await getTokens(fullUrl, login, password);
  }

  _refreshToken() {
    throw new Error('Not implemented');
  }

  async login(login, password) {
    // 1. Get tokens
    const { access_token, refresh_token } = await this._getTokens(
      login,
      password
    );
    // 2. Save to local storage
    this._storage.setItems([
      { key: ACCESS_TOKEN_KEY, value: access_token },
      { key: REFRESH_TOKEN_KEY, value: refresh_token },
    ]);
    // 3. Decode token
    const parsedJwt = parseJwt(access_token);
    // 4. Get validity in ms
    const secondsValid = parsedJwt.exp - parsedJwt.iat;
    const msValid = secToMs(secondsValid);

    return parsedJwt;
    // 4. Run loop for refreshing
  }

  logout() {
    // 1. Stop interval

    // 2. Remove items from local storage
    this._storage.removeItems([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  }

  register() {
    throw new Error('Not implemented');
  }
}
