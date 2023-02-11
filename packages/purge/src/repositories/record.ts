import { Db } from 'mongodb';

import { getDbClient } from '../db';

export interface IRecordRepository {
  deleteOlderThan: (date: Date) => Promise<number>;
}

export class RecordRepository implements IRecordRepository {
  constructor(private readonly client: Db) {}

  async deleteOlderThan(date: Date): Promise<number> {
    const { deletedCount } = await this.client.collection('records').deleteMany({
      expiary: {
        $lt: date,
      },
    });

    return deletedCount;
  }
}

let recordRepository: IRecordRepository;

export async function getRecordRepository() {
  if (!recordRepository) {
    const dbClient = await getDbClient();
    recordRepository = new RecordRepository(dbClient);
  }

  return recordRepository;
}
