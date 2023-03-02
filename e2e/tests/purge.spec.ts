import fetch from 'node-fetch';

import { OTS_SHARE_URL, checkUp } from './configs';

const apiPath = `${OTS_SHARE_URL}/api`;

async function apiPost(data: unknown): Promise<string> {
  const response = await fetch(`${apiPath}/record`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const { id } = await response.json<{ id: string }>();

  return id;
}

async function apiGetStatus(id: string): Promise<number> {
  const response = await fetch(`${apiPath}/record/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response.status;
}

describe('Purge', () => {
  beforeAll(async () => {
    await checkUp();
  });

  it('should delete record once it has been accessed', async () => {
    const id = await apiPost({
      content: 'test',
      expireIn: { value: 1, unit: 'minutes' },
    });

    const responseCodeGet1 = await apiGetStatus(id);
    expect(responseCodeGet1).toBe(200);

    const responseCodeGet2 = await apiGetStatus(id);
    expect(responseCodeGet2).toBe(404);
  });

  it('should clean expired data', async () => {
    const id = await apiPost({
      content: 'test',
      expireIn: { value: 1, unit: 'minutes' },
    });

    // Wait for 2 minutes
    await new Promise((r) => setTimeout(r, 12_0000));
    const responseCode = await apiGetStatus(id);

    expect(responseCode).toBe(404);
  });
});
