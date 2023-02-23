import { IRecordPurgeRepository, IRecordRepository } from '../../interfaces/record';
import { getClient } from '../postgresql/client';

import { RECORD_TABLE_NAME } from './common';

import type { models } from '@ots-share/model';
import type { Knex } from 'knex';

export class RecordRepository implements IRecordRepository, IRecordPurgeRepository {
  constructor(private readonly client: Knex) {}

  async findById(id: string): Promise<models.IRecord | undefined> {
    const results = await this.client
      .column('id', 'slug', 'content', 'expiary', 'status')
      .select()
      .from<models.IRecord>(RECORD_TABLE_NAME)
      .where('id', id);

    return results.pop();
  }

  async create(record: models.IRecord): Promise<models.IRecord> {
    await this.client.insert(record).into<models.IRecord>(RECORD_TABLE_NAME);

    const foundItem = await this.client
      .column(Object.keys(record))
      .select()
      .from<models.IRecord>(RECORD_TABLE_NAME)
      .where('id', record.id)
      .first();

    return foundItem;
  }

  async delete(id: string): Promise<void> {
    await this.client.delete().from(RECORD_TABLE_NAME).where('id', id);
  }

  async deleteOlderThan(date: Date): Promise<number> {
    const rowCount = await this.client.delete().from(RECORD_TABLE_NAME).where('expiary', '<', date);

    return rowCount;
  }
}

let recordRepository: IRecordRepository & IRecordPurgeRepository;

export function getRecordRepository(
  connectionString: string
): IRecordRepository & IRecordPurgeRepository {
  if (!recordRepository) {
    recordRepository = new RecordRepository(getClient(connectionString));
  }

  return recordRepository;
}
