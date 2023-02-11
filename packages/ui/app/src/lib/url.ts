import base58 from 'bs58';
import { models } from '@ots-share/common';

const REVEAL_CONTENT_URL_PATH = 'r';
const idKeySeparator = ':';

export function buildUrlToShare(
  domain: string,
  response: models.IRecord,
  encriptionKey: string
): string {
  const encoder = new TextEncoder();
  const encodedArray = encoder.encode(`${response.id}${idKeySeparator}${encriptionKey}`);

  return `${domain}/${REVEAL_CONTENT_URL_PATH}/${base58.encode(encodedArray)}`;
}

export function parseAndExtractUrl(url: string):
  | {
      id: string;
      password: string;
    }
  | undefined {
  const { pathname } = new URL(url);
  const [, , keyIdPath] = pathname.split('/', 3);

  if (!keyIdPath) {
    return undefined;
  }

  const decoder = new TextDecoder();
  const text = decoder.decode(base58.decode(keyIdPath));
  const [id, password] = text.split(idKeySeparator, 2);

  if (!id || !password) {
    return undefined;
  }

  return {
    id,
    password,
  };
}
