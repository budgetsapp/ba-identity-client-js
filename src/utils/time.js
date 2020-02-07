/**
 * Converts value in seconds to value in ms
 * @param    {number} sec - value in seconds
 * @returns  {number} value in ms
 */
export function secToMs(sec) {
  if (sec !== 0 && !sec) {
    throw new Error('Incorrect sec value passed');
  }
  return sec * 1000;
}

/**
 * Gets refresh timer, which should be less than expiration time
 * @export
 * @param {number} expiration - Token expiration time
 * @param {number} [divider=5] - Divide expiration time to make refresh more often
 * @returns {number} refresh interval
 */
export function getRefreshInterval(expiration, divider = 5) {
  return Math.round(expiration / divider);
}
