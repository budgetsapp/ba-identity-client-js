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
    this._timerId;
    // options
    this._storage = new Storage(options.storage);
    this._refreshInterval_MS =
      options.refreshInterval_MS || TOKEN_REFRESH_INTERVAL_MS;
    this._tokensUpdatedCallback =
      options.tokensUpdatedCallback || function() {};
  }

  /**
   * Sets tokensUpdatedCallback
   * @param {function} callback
   */
  setTokensUpdatedCallback(callback) {
    this._tokensUpdatedCallback = callback;
  }

  /**
   * Runs tokens updated callback
   * @private
   * @param {string} accessToken
   * @param {string} refreshToken
   */
  _runTokensUpdatedCallback(accessToken, refreshToken) {
    if (typeof this._tokensUpdatedCallback !== 'function') {
      throw new Error('tokensUpdatedCallback is not a function');
    } else {
      const data = {
        accessToken,
        refreshToken,
        data: accessToken ? extractDataFromToken(accessToken) : {},
      };
      this._tokensUpdatedCallback(data);
    }
  }

  /**
   *  Auto updates tokens
   */
  autoUpdateToken() {
    // Run loop for refreshing
    clearTimeout(this._timerId);
    this._refreshToken(); // run immediately
    this._timerId = setInterval(() => {
      this._refreshToken();
    }, this._refreshInterval_MS);
  }

  /**
   * Makes API call to get tokens
   * @private
   * @param {string} login - user's login
   * @param {string} password - user's password
   * @returns {{access_token: string, refresh_token: string}} tokens
   */
  async _getTokens(login, password) {
    const fullUrl = getFullUrl(this.serverUrl, GET_TOKENS_URL);
    return await getTokens(fullUrl, login, password);
  }

  async _refreshToken() {
    log('Refreshing token');
    // 1. Get refresh token
    const refreshTokenFromStorage = await this._storage.getItem(
      REFRESH_TOKEN_KEY
    );

    if (refreshTokenFromStorage) {
      // 2. Get new access_token token from API call
      const fullUrl = getFullUrl(this.serverUrl, REFRESH_TOKEN_URL);
      try {
        const { access_token } = await refreshAccessToken(
          fullUrl,
          refreshTokenFromStorage
        );
        // 3. Save access_token
        this._storage.setItem(ACCESS_TOKEN_KEY, access_token);
        this._runTokensUpdatedCallback(access_token, refreshTokenFromStorage);
      } catch (e) {
        log('Failed to refresh tokens');
        this._runTokensUpdatedCallback(null, refreshTokenFromStorage);
      }
    } else {
      log('No refresh token found');
      this._runTokensUpdatedCallback(null, null);
    }
  }

  /**
   * Returns if refresh token is expired
   * @param {string} refresh_token - Refresh token
   * @returns if refresh token is expired
   */
  isRefreshTokenExpired(refresh_token) {
    if (refresh_token) {
      return isRefreshTokenExpired(refresh_token);
    } else {
      return true;
    }
  }

  /**
   * Logs in user with credentials and saves tokens
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

    this._runTokensUpdatedCallback(access_token, refresh_token);
  }

  /**
   * Logs out user
   */
  logout() {
    // 1. Stop interval
    clearTimeout(this._timerId);
    // 2. Remove items from local storage
    this._storage.removeItems([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
    this._runTokensUpdatedCallback(null, null);
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
