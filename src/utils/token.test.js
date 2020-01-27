import { parseJwt } from './token';

describe('parseJwt', () => {
  test('should parse given token correctly', () => {
    const testToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const actualResult = parseJwt(testToken);
    const expectedResult = {
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    };
    expect(actualResult).toMatchObject(expectedResult);
  });

  test('should throw an error if "null" is passed', () => {
    function callParseJwt() {
      parseJwt(null);
    }
    expect(callParseJwt).toThrowError('Invalid token');
  });

  test('should throw an error if "undefined" is passed', () => {
    function callParseJwt() {
      parseJwt(undefined);
    }
    expect(callParseJwt).toThrowError('Invalid token');
  });

  test('should throw an error if empty string is passed', () => {
    function callParseJwt() {
      parseJwt('');
    }
    expect(callParseJwt).toThrowError('Invalid token');
  });

  test('should throw an error if nothing is passed', () => {
    function callParseJwt() {
      parseJwt();
    }
    expect(callParseJwt).toThrowError('Invalid token');
  });
});
