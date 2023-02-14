import { IRepositoryStrategy } from './interfaces/strategy';
import { initStorage as initStorageMongo } from './mongo/init';
import { getRecordRepository } from './mongo/record';

export enum DbTypeEnum {
  pg = 'pg',
  mongo = 'mongo',
}

export function selectRepository(dbTypeEnum?: DbTypeEnum): IRepositoryStrategy {
  if (!dbTypeEnum || dbTypeEnum === DbTypeEnum.mongo) {
    return {
      initStorage: initStorageMongo,
      getRecordRepository,
    };
  }

  throw new Error(`Invalid db type: ${dbTypeEnum}`);
}
