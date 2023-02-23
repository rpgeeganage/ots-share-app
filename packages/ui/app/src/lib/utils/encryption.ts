import { AES, enc, lib, PBKDF2, mode, pad } from 'crypto-js';
import cryptoRandomString from 'crypto-random-string';

const EncryptDecryptParams = {
  mode: mode.CBC,
  padding: pad.AnsiX923,
};

export function encrypt(content: string, password: string) {
  const cipherText = AES.encrypt(content, password, EncryptDecryptParams);
  return cipherText.toString();
}

export function decrypt(content: string, password: string) {
  try {
    const decyper = AES.decrypt(content, password, EncryptDecryptParams);

    return decyper.toString(enc.Utf8);
  } catch {
    return undefined;
  }
}

export function createRandomPassword(): string {
  return PBKDF2(cryptoRandomString({ length: 32 }), lib.WordArray.random(128 / 8), {
    keySize: 256 / 32,
  }).toString(enc.Hex);
}
