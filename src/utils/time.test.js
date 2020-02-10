import { secToMs } from './time';

describe('secToMs', () => {
  test('should convert ms to sec correctly', () => {
    const actualResult = secToMs(15);
    const expectedResult = 15000; // ms
    expect(actualResult).toBe(expectedResult);
  });

  test('should convert ms to sec correctly id 0 is passed', () => {
    const actualResult = secToMs(0);
    const expectedResult = 0; // ms
    expect(actualResult).toBe(expectedResult);
  });

  test('should throw an error if nothing is passed', () => {
    function callSecToMs() {
      secToMs();
    }
    expect(callSecToMs).toThrowError('Incorrect sec value passed');
  });

  test('should throw an error if null is passed', () => {
    function callSecToMs() {
      secToMs(null);
    }
    expect(callSecToMs).toThrowError('Incorrect sec value passed');
  });
});
