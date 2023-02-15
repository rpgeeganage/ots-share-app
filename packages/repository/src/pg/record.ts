import { models } from '@ots-share/common';
import { PoolClient } from 'pg';

import { IRecordPurgeRepository, IRecordRepository } from '../interfaces/record';

import { getClient } from './init';

export class RecordRepository implements IRecordRepository, IRecordPurgeRepository {
  constructor(private readonly client: PoolClient) {}

  async findById(id: string): Promise<models.IRecord | undefined> {
    const { rows } = await this.client.query(
      'SELECT id, slug, content, expiary, status, created_at FROM record WHERE id = $1',
      [id]
    );

    const [firstRecord] = rows;

    return firstRecord;
  }

  async create(record: models.IRecord): Promise<models.IRecord> {
    const { id, slug, content, expiary, status } = record;

    const { rows } = await this.client.query(
      'INSERT INTO record (id, slug, content, expiary, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, slug, content, expiary, status]
    );
    const [firstRecord] = rows;

    return firstRecord;
  }

  async delete(id: string): Promise<void> {
    await this.client.query('DELETE FROM record WHERE id = $1', [id]);
  }

  async deleteOlderThan(date: Date): Promise<number> {
    const { rowCount } = await this.client.query('DELETE FROM record WHERE expiary < $1', [date]);

    return rowCount;
  }
}

let recordRepository: IRecordRepository & IRecordPurgeRepository;

export function getRecordRepository(): IRecordRepository & IRecordPurgeRepository {
  if (!recordRepository) {
    recordRepository = new RecordRepository(getClient());
  }

  return recordRepository;
}
