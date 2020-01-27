import { get, post } from './rest';

export async function getTokens(fullUrl, login, password) {
  return await post(fullUrl, {
    login,
    password,
  });
}

export async function refreshAccessToken(fullUrl, refreshToken) {
  return await get(fullUrl, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
}
