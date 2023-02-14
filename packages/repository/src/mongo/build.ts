import { IRepositoryStrategy } from '../interfaces/strategy';

import { connectDb } from './init';
import { getRecordRepository } from './record';

export async function build(connectionString: string): Promise<IRepositoryStrategy> {
  await connectDb(connectionString);

  return {
    recordRepository: getRecordRepository(),
  };
}
