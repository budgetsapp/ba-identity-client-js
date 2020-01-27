import jwt_decode from 'jwt-decode';
import { secToMs } from '../utils/time';

export function parseJwt(token) {
  return jwt_decode(token);
}

export function extractDataFromToken(accessToken) {
  const parsedToken = parseJwt(accessToken);
  return {
    ...parsedToken.user_claims,
    login: parsedToken.identity,
    valid_in_ms: secToMs(parsedToken.exp - parsedToken.iat),
  };
}
