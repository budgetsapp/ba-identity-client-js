import { get, post } from './rest';

/**
 * Makes a request for tokens
 * @param   {string} fullUrl - full URL
 * @param   {string} login - user's login
 * @param   {string} password - user's password
 * @returns {Promise<{access_token: string, refresh_token: string}>} Access token and refresh token
 */
export async function getTokens(fullUrl, login, password) {
  return await post(fullUrl, {
    login,
    password,
  });
}

/**
 * Makes a request for refreshing token
 * @param   {string} fullUrl - full URL
 * @param   {string} refreshToken - refresh token
 * @returns {Promise<{access_token: string}>} Access token and refresh token
 */
export async function refreshAccessToken(fullUrl, refreshToken) {
  return await get(fullUrl, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
}
