export async function post(urlPath: string, data: unknown) {
  const rawResponse = await fetch(`/api/${urlPath}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return rawResponse.json();
}

export async function get(urlPath: string) {
  const rawResponse = await fetch(`/api/${urlPath}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return rawResponse.json();
}