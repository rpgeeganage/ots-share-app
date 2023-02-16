import { URL } from 'node:url';

import { IRepositoryStrategy } from './interfaces/strategy';
import { mongo } from './nosql/';
import { postgresSql, mysql } from './rdbms';
import { record as recordRdbms } from './rdbms/models';

enum dbProtocollEnum {
  mongodb = 'mongodb',
  postgres = 'postgres',
  postgresql = 'postgresql',
  mysql = 'mysql',
}

export function selectRepository(connectionString: string): IRepositoryStrategy {
  const url = new URL(connectionString);
  const protocol = url.protocol.replace(':', '');

  switch (protocol) {
    case dbProtocollEnum.mongodb:
      return {
        initStorage: () => mongo.initStorageMongo(connectionString),
        getRecordRepository: mongo.getRecordRepositoryMongo,
      };

    case dbProtocollEnum.postgres:
    case dbProtocollEnum.postgresql:
      return {
        initStorage: () => postgresSql.initStoragePostgreSql(connectionString),
        getRecordRepository: () => recordRdbms.getRecordRepository(connectionString),
      };

    case dbProtocollEnum.mysql:
      return {
        initStorage: () => mysql.initStorageMySql(connectionString),
        getRecordRepository: () => recordRdbms.getRecordRepository(connectionString),
      };

    default:
      throw new Error(`Invalid db type: ${url}`);
  }
}
