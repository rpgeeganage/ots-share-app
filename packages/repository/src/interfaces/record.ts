import { models } from '@ots-share/model';

export interface IRecordRepository {
  findById: (id: string) => Promise<models.IRecord | undefined>;
  create: (record: models.IRecord) => Promise<models.IRecord>;
  delete: (id: string) => Promise<void>;
}

export interface IRecordPurgeRepository {
  deleteOlderThan: (date: Date) => Promise<number>;
}
