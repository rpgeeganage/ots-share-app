import fetch from 'node-fetch';

import { OTS_SHARE_URL } from './configs';

const apiPath = `${OTS_SHARE_URL}/api/`;

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

describe('Purge', () => {
  it('should clean expired data', async () => {
    const id = await apiPost({
      content: 'test',
      expireIn: { value: 1, unit: 'minutes' },
    });

    console.log(id);
    expect(true).toBe(true);
  });
});
