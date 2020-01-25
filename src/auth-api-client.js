import { getTokens } from './services/auth';
import { getFullUrl } from './utils/path';
import { GET_TOKENS_URL } from './const/urls';

export class AuthApiClient {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  getTokens() {
    const fullUrl = getFullUrl(this.serverUrl, GET_TOKENS_URL);
    return getTokens(fullUrl);
  }

  hello() {
    return `Hello, World! Server URL: ${this.serverUrl}`;
  }
}
