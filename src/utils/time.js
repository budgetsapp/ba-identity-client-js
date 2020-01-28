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
