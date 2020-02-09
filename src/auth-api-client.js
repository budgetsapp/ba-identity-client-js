import { getTokens, refreshAccessToken } from './services/auth';
import { getFullUrl } from './utils/path';
import { GET_TOKENS_URL, REFRESH_TOKEN_URL } from './const/urls';
import {
  AUTH_API_CLIENT_MODULE_NAME,
  TOKEN_REFRESH_INTERVAL_MS,
} from './const/app';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './const/storage-keys';
import { Storage } from './utils/storage';
import { extractDataFromToken, isRefreshTokenExpired } from './utils/token';
import debug from 'debug';

const log = debug(AUTH_API_CLIENT_MODULE_NAME);

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
    this._refreshInterval_MS =
      options.refreshInterval_MS || TOKEN_REFRESH_INTERVAL_MS;
    this._timerId;
  }

  autoUpdateToken() {
    // Run loop for refreshing
    clearTimeout(this._timerId);
    this._timerId = setInterval(() => {
      this._refreshToken();
    }, this._refreshInterval_MS);
  }

  async _getTokens(login, password) {
    const fullUrl = getFullUrl(this.serverUrl, GET_TOKENS_URL);
    return await getTokens(fullUrl, login, password);
  }

  async _refreshToken() {
    log('Refreshing token');
    // 1. Get refresh token
    const refresh_token = await this._storage.getItem(REFRESH_TOKEN_KEY);

    if (refresh_token) {
      // 2. Get new access_token token from API call
      const fullUrl = getFullUrl(this.serverUrl, REFRESH_TOKEN_URL);
      const { access_token } = await refreshAccessToken(fullUrl, refresh_token);
      // 3. Save access_token
      await this._storage.setItem(ACCESS_TOKEN_KEY, access_token);
    } else {
      clearTimeout(this._timerId);
      log('No refresh token found');
    }
  }

  async isRefreshTokenExpired() {
    const refresh_token = await this._storage.getItem(REFRESH_TOKEN_KEY);
    if (refresh_token) {
      return isRefreshTokenExpired(refresh_token);
    } else {
      return null;
    }
  }

  /**
   * Logins user with credentials and saves tokens
   * @param   {string} login - user's login
   * @param   {string} password - user's password
   * @returns {Promise<Object>} data extracted from the token
   */
  async login(login, password) {
    log('Logging in');
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

    this.autoUpdateToken();
    const data = extractDataFromToken(access_token);
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
    // Check login if it is free on server side
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

  /**
   * Add new role to the user, only admins are allowed to invoke it
   */
  addRole() {
    throw new Error('Not implemented');
  }

  /**
   * Removes the role from the user, only admins are allowed to invoke it
   */
  removeRole() {
    throw new Error('Not implemented');
  }
}
