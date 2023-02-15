import { URL } from 'node:url';

import { IRepositoryStrategy } from './interfaces/strategy';
import { initStorage as initStorageMongo } from './mongo/init';
import { getRecordRepository as getRecordRepositoryMongo } from './mongo/record';
import { initStorage as initStoragePg } from './pg/init';
import { sql as initSqlPg } from './pg/init_sql';
import { getRecordRepository as getRecordRepositoryPg } from './pg/record';

enum dbProtocollEnum {
  mongodb = 'mongodb',
  postgres = 'postgres',
  postgresql = 'postgresql',
}

export function selectRepository(connectionString: string): IRepositoryStrategy {
  const url = new URL(connectionString);
  const protocol = url.protocol.replace(':', '');

  switch (protocol) {
    case dbProtocollEnum.mongodb:
      return {
        initStorage: () => initStorageMongo(connectionString),
        getRecordRepository: getRecordRepositoryMongo,
      };

    case dbProtocollEnum.postgres:
    case dbProtocollEnum.postgresql:
      return {
        initStorage: () => initStoragePg(connectionString, initSqlPg),
        getRecordRepository: getRecordRepositoryPg,
      };

    default:
      throw new Error(`Invalid db type: ${url}`);
  }
}
