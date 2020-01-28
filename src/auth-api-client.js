import { getTokens, refreshAccessToken } from './services/auth';
import { getFullUrl } from './utils/path';
import { GET_TOKENS_URL, REFRESH_TOKEN_URL } from './const/urls';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './const/storage-keys';
import { Storage } from './utils/storage';
import { extractDataFromToken } from './utils/token';

/** Class representing a auth API client */
export class AuthApiClient {
  /**
   * Create a AuthApiClient
   * @param {string} serverUrl - URL of the server to make requests
   * @param {{ storage: Object }} options - additional options
   */
  constructor(serverUrl, options) {
    this.serverUrl = serverUrl;
    this._storage = new Storage(options.storage);
    this._timerId;
  }

  _setRefresh(access_token) {
    // 1. Decode token
    const data = extractDataFromToken(access_token);

    // 2. Run loop for refreshing
    clearTimeout(this._timerId);
    this._timerId = setTimeout(async () => {
      await this._refreshToken();
    }, data.valid_in_ms);
    return data;
  }

  async _getTokens(login, password) {
    const fullUrl = getFullUrl(this.serverUrl, GET_TOKENS_URL);
    return await getTokens(fullUrl, login, password);
  }

  async _refreshToken() {
    console.debug('Start refresh token');
    // 1. Get refresh token
    const refresh_token = this._storage.getItem(REFRESH_TOKEN_KEY);

    if (refresh_token) {
      // 2. Get new access_token token from API call
      const fullUrl = getFullUrl(this.serverUrl, REFRESH_TOKEN_URL);
      const { access_token } = await refreshAccessToken(fullUrl, refresh_token);
      // 3. Save access_token
      this._storage.setItem(ACCESS_TOKEN_KEY, access_token);
      // 4. Run loop for refreshing
      this._setRefresh(access_token);
    } else {
      throw new Error('No refresh token found');
    }
  }

  /**
   * Logins user with credentials and saves tokens
   * @param   {string} login - user's login
   * @param   {string} password - user's password
   * @returns {Promise<Object>} data extracted from the token
   */
  async login(login, password) {
    console.debug('Start getting token');
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

    // 3. Run loop for refreshing
    const data = this._setRefresh(access_token);

    return data;
  }

  /**
   * Logs out user
   */
  logout() {
    // 1. Stop interval
    clearTimeout(this._timerId);
    // 2. Remove items from local storage
    this._storage.removeItems([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  }

  /**
   * Registers new user
   */
  register() {
    throw new Error('Not implemented');
  }

  /**
   * Recovers user's password
   */
  recoverPassword() {
    throw new Error('Not implemented');
  }

  /**
   * Sets new user's password
   */
  setPassword() {
    throw new Error('Not implemented');
  }
}
