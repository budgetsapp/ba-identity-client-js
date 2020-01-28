/**
 * Makes GET request
 * @param   {string} fullUrl - full URL
 * @param   {{ headers: Object }} options - additional options for the request
 * @returns {Object} JSON object
 */
export async function get(fullUrl, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers,
  });
  const json = await response.json();
  return json;
}

/**
 * Makes POST request
 * @param   {string} fullUrl - full URL
 * @param   {Object} data - data for POST
 * @returns {Object} JSON object
 */
export async function post(fullUrl, data) {
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
}
