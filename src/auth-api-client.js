import { getTokens } from './services/auth';
import { getFullUrl } from './utils/path';
import { GET_TOKENS_URL } from './const/urls';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './const/storage-keys';
import { removeItems } from './utils/storage';

export class AuthApiClient {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  _getTokens() {
    const fullUrl = getFullUrl(this.serverUrl, GET_TOKENS_URL);
    return getTokens(fullUrl);
  }

  _refreshToken() {
    throw new Error('Not implemented');
  }

  login() {
    // 1. Get tokens
    const {} = await this._getTokens()
    // 2. Get time to expiration
    // 3. Save to local storage
    // 4. Run loop for refreshing
  }

  logout() {
    // 1. Stop interval

    // 2. Remove items from local storage
    removeItems([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  }

  register() {
    throw new Error('Not implemented');
  }
}
