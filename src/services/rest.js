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
