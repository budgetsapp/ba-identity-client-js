import { get } from './rest';

export const getTokens = fullUrl => {
  return get(fullUrl);
};
