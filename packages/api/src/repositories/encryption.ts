import { randomBytes } from 'crypto';

import { models } from '@ots-share/common';

export interface IEncryptionRepository {
  create: () => Promise<models.IEncryption>;
}

export class EncryptionRepository implements IEncryptionRepository {
  create(): Promise<models.IEncryption> {
    return Promise.resolve({
      key: randomBytes(32).toString('hex'),
      iv: randomBytes(32).toString('hex'),
    });
  }
}

let encryptionRepository: EncryptionRepository;

export function getEncryptionRepository() {
  if (!encryptionRepository) {
    encryptionRepository = new EncryptionRepository();
  }

  return encryptionRepository;
}
