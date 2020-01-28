export function secToMs(sec) {
  if (sec !== 0 && !sec) {
    throw new Error('Incorrect sec value passed');
  }
  return sec * 1000;
}
