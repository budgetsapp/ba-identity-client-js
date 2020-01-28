/**
 * Concatenates server url and route
 * @param   {string} serverUrl - URL of the server
 * @param   {string} url - URL of the route
 * @returns {string} Concatenated full URL
 */
export function getFullUrl(serverUrl, url) {
  return [serverUrl, url].map(str => trimChar(str, '/')).join('/');
}

/**
 * Trims specified char from string
 * @param   {string} str - string
 * @param   {string} char - char to trim
 * @returns {string} Trimmed string
 */
export function trimChar(str, char) {
  const regEx = new RegExp(`^[${char}]+|[${char}]+$`, 'g');
  const trimmed = str.replace(regEx, '');
  return trimmed;
}
