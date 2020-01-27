import { getTokens } from './services/auth';
import { getFullUrl } from './utils/path';
import { GET_TOKENS_URL } from './const/urls';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './const/storage-keys';
import { Storage } from './utils/storage';
import { extractDataFromToken } from './utils/token';

export class AuthApiClient {
  constructor(serverUrl, options) {
    this.serverUrl = serverUrl;
    this._storage = new Storage(options.storage);
    this._timerId;
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
    const data = extractDataFromToken(access_token);

    // 4. Run loop for refreshing
    clearTimeout(this._timerId);
    this._timerId = setTimeout(() => {
      this.login(login, password);
    }, m.valid_in_ms);

    return data;
  }

  logout() {
    // 1. Stop interval
    clearTimeout(this._timerId);
    // 2. Remove items from local storage
    this._storage.removeItems([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  }

  register() {
    throw new Error('Not implemented');
  }
}
