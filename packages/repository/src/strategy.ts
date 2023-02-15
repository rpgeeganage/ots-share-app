import { URL } from 'node:url';

import { IRepositoryStrategy } from './interfaces/strategy';
import { initStorage as initStorageMongo } from './mongo/init';
import { getRecordRepository } from './mongo/record';
import { initStorage as initStoragePg } from './pg/init';
import { sql as initSqlPg } from './pg/init_sql';

enum dbProtocollEnum {
  mongodb = 'mongodb',
  postgresql = 'postgresql',
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

    case dbProtocollEnum.postgresql:
      return {
        initStorage: () => initStoragePg(connectionString, initSqlPg),
        getRecordRepository,
      };

    default:
      throw new Error(`Invalid db type: ${url}`);
  }
}
