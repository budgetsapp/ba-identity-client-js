import jwt_decode from 'jwt-decode';
import { secToMs } from '../utils/time';

/**
 * Decodes JWT token
 * @param    {string} token - JWT access token or JWT refresh token
 * @returns  {Object} object containing claims and other data
 */
export function parseJwt(token) {
  return jwt_decode(token);
}

/**
 * Returns custom object from JWT access token
 * @param    {string} accessToken - JWT access token
 * @returns  {Object} flatten custom object containg data from decoded JWT token
 */
export function extractDataFromToken(accessToken) {
  const parsedToken = parseJwt(accessToken);
  return {
    ...parsedToken.user_claims,
    login: parsedToken.identity,
    valid_in_ms: secToMs(parsedToken.exp - parsedToken.iat),
  };
}
