import base58 from 'bs58';
import { models } from '@ots-share/model';

const REVEAL_CONTENT_URL_PATH = 'r';
const idKeySeparator = ':';

export enum RecordTypesEnum {
  file = 'file',
  text = 'text',
}

export type parsedPathType = {
  id: string;
  password: string;
  type: RecordTypesEnum;
  fileName?: string;
};

type urlSplitType = [string, string, RecordTypesEnum, string?];

export function buildUrlToShare({
  domain,
  response,
  password,
  fileName,
  type,
}: {
  domain: string;
  response: models.IRecord;
  password: string;
  fileName?: string;
  type: RecordTypesEnum;
}): string {
  const encoder = new TextEncoder();
  const urlPath = [response.id, password, type];

  if (fileName) {
    urlPath.push(fileName);
  }

  const encodedArray = encoder.encode(urlPath.join(idKeySeparator));

  return [domain, REVEAL_CONTENT_URL_PATH, encodeURIComponent(base58.encode(encodedArray))].join(
    '/'
  );
}

export function parseAndExtractUrl(url: string): parsedPathType | undefined {
  const { pathname } = new URL(url);
  const [, , keyIdPath] = pathname.split('/', 3);

  if (!keyIdPath) {
    return undefined;
  }

  const decodedString = decodeURIComponent(keyIdPath);

  return base58Decode(decodedString) ?? base64Decode(decodedString);
}

function base58Decode(stringToDecode: string): parsedPathType | undefined {
  const decoder = new TextDecoder();
  const text = decoder.decode(base58.decode(stringToDecode));
  const [id, password, type, fileName] = text.split(idKeySeparator) as urlSplitType;

  if (!id || !password) {
    return undefined;
  }

  return {
    id,
    password,
    type,
    fileName,
  };
}

function base64Decode(stringToDecode: string): parsedPathType | undefined {
  const [id, password, type, fileName] = atob(stringToDecode).split(idKeySeparator) as urlSplitType;

  if (!id || !password) {
    return undefined;
  }

  return {
    id,
    password,
    type,
    fileName,
  };
}
