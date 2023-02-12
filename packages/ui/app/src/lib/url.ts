import base58 from 'bs58';
import { models } from '@ots-share/common';

const REVEAL_CONTENT_URL_PATH = 'r';
const idKeySeparator = ':';

type parsedPathType =
  | {
      id: string;
      password: string;
    }
  | undefined;

export function buildUrlToShare(
  domain: string,
  response: models.IRecord,
  encriptionKey: string
): string {
  const encoder = new TextEncoder();
  const encodedArray = encoder.encode(`${response.id}${idKeySeparator}${encriptionKey}`);

  return `${domain}/${REVEAL_CONTENT_URL_PATH}/${encodeURIComponent(base58.encode(encodedArray))}`;
}

export function parseAndExtractUrl(url: string): parsedPathType {
  const { pathname } = new URL(url);
  const [, , keyIdPath] = pathname.split('/', 3);

  if (!keyIdPath) {
    return undefined;
  }

  const decodedString = decodeURIComponent(keyIdPath)

  return base58Decode(decodedString) ?? base64Decode(decodedString);
}

function base58Decode(stringToDecode: string): parsedPathType {
  const decoder = new TextDecoder();
  const text = decoder.decode(base58.decode(stringToDecode));
  const [id, password] = text.split(idKeySeparator, 2);

  if (!id || !password) {
    return undefined;
  }

  return {
    id,
    password,
  };
}

function base64Decode(stringToDecode: string): parsedPathType {
  const [id, password] = atob(stringToDecode).split(idKeySeparator, 2);

  if (!id || !password) {
    return undefined;
  }

  return {
    id,
    password,
  };
}