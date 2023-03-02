import fetch from 'node-fetch';

export const OTS_SHARE_URL = <string>process.env['OTS_SHARE_URL'];

const maxRetryCount = 10;
export function checkUp() {
  let retryCount = 0;

  async function callWeb(): Promise<void> {
    try {
      const response = await fetch(`${OTS_SHARE_URL}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error(`not up: ${OTS_SHARE_URL}`);
      }
    } catch (error) {
      if (retryCount >= maxRetryCount) {
        throw error;
      }

      const retryMs = 2000 * (retryCount > 0 ? retryCount : 1);

      retryCount++;

      await new Promise((r) => setTimeout(r, retryMs));

      return callWeb();
    }
  }

  return callWeb();
}
