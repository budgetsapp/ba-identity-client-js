import { trimChar, getFullUrl } from './path';

describe('trimChar', () => {
  test('should trim correctly', () => {
    const strToTrim = 'aba';
    const expectedResult = 'b';
    const actualResult = trimChar(strToTrim, 'a');
    expect(actualResult).toBe(expectedResult);
  });

  test('should trim correctly if no char for trim', () => {
    const strToTrim = 'aba';
    const expectedResult = 'aba';
    const actualResult = trimChar(strToTrim, 'c');
    expect(actualResult).toBe(expectedResult);
  });

  test('should trim correctly if str is empty', () => {
    const strToTrim = '';
    const expectedResult = '';
    const actualResult = trimChar(strToTrim, 'c');
    expect(actualResult).toBe(expectedResult);
  });

  test('should trim correctly if char is empty', () => {
    const strToTrim = 'aba';
    const expectedResult = 'aba';
    const actualResult = trimChar(strToTrim, '');
    expect(actualResult).toBe(expectedResult);
  });

  test('should trim correctly if multiple char in the string to trim', () => {
    const strToTrim = 'aaabaaa';
    const expectedResult = 'b';
    const actualResult = trimChar(strToTrim, 'a');
    expect(actualResult).toBe(expectedResult);
  });
});

describe('getFullUrl', () => {
  test('should get correct full URL if no char to trim', () => {
    const serverUrl = 'http://example.com';
    const url = 'some-route';
    const expectedResult = 'http://example.com/some-route';
    const actualResult = getFullUrl(serverUrl, url);
    expect(actualResult).toBe(expectedResult);
  });

  test('should get correct full URL if serverUrl has / at the end', () => {
    const serverUrl = 'http://example.com/';
    const url = 'some-route';
    const expectedResult = 'http://example.com/some-route';
    const actualResult = getFullUrl(serverUrl, url);
    expect(actualResult).toBe(expectedResult);
  });

  test('should get correct full URL if route has / at the beginning', () => {
    const serverUrl = 'http://example.com';
    const url = '/some-route';
    const expectedResult = 'http://example.com/some-route';
    const actualResult = getFullUrl(serverUrl, url);
    expect(actualResult).toBe(expectedResult);
  });

  test('should get correct full URL if both has trailing /', () => {
    const serverUrl = 'http://example.com/';
    const url = '/some-route';
    const expectedResult = 'http://example.com/some-route';
    const actualResult = getFullUrl(serverUrl, url);
    expect(actualResult).toBe(expectedResult);
  });
});
