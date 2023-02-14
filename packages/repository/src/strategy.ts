import { IRepositoryStrategy } from './interfaces/strategy';
import { build as mongoBuild } from './mongo/build';

export enum DbTypeEnum {
  pg = 'pg',
  mongo = 'mongo',
}

export function selectRepository(
  connectionString: string,
  dbTypeEnum?: DbTypeEnum
): Promise<IRepositoryStrategy> {
  if (!dbTypeEnum || dbTypeEnum === DbTypeEnum.mongo) {
    return mongoBuild(connectionString);
  }

  throw new Error(`Invalid db type: ${dbTypeEnum}`);
}
