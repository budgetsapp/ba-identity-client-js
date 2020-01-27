import { get, post } from './rest';

export async function getTokens(fullUrl, login, password) {
  return await post(fullUrl, {
    login,
    password,
  });
}
