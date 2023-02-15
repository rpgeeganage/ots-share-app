import { URL } from 'node:url';

import { IRepositoryStrategy } from './interfaces/strategy';
import { initStorage as initStorageMongo } from './mongo/init';
import { getRecordRepository } from './mongo/record';

enum dbProtocollEnum {
  mongodb = 'mongodb',
}

export function selectRepository(connectionString: string): IRepositoryStrategy {
  const url = new URL(connectionString);
  const protocol = url.protocol.replace(':', '');

  switch (protocol) {
    case dbProtocollEnum.mongodb:
      return {
        initStorage: () => initStorageMongo(connectionString),
        getRecordRepository,
      };

    default:
      throw new Error(`Invalid db type: ${url}`);
  }
}
