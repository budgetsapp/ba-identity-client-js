import * as jwt_decode from 'jwt-decode';

export function parseJwt(token) {
  return jwt_decode(token);
}
