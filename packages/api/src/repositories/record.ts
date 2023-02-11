import { models } from '@ots-share/common';

import { RecordModel } from '../models/record';

export interface IRecordRepository {
  findById: (id: string) => Promise<models.IRecord | undefined>;
  create: (record: models.IRecord) => Promise<models.IRecord>;
  update: (record: models.IRecord) => Promise<models.IRecord>;
  delete: (id: string) => Promise<void>;
}

export class RecordRepository implements IRecordRepository {
  constructor(private readonly model: typeof RecordModel) {}

  async findById(id: string): Promise<models.IRecord | undefined> {
    const record = await this.model.findOne({
      id,
    });

    return record?.toJSON<models.IRecord>({
      versionKey: false,
      transform: (_: unknown, ret: { _id?: unknown; updatedAt?: unknown }) => {
        delete ret._id;
        delete ret.updatedAt;
      },
    });
  }

  create(record: models.IRecord): Promise<models.IRecord> {
    return this.upsert(record);
  }

  update(record: models.IRecord): Promise<models.IRecord> {
    return this.upsert(record);
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ id });
  }

  private async upsert(record: models.IRecord): Promise<models.IRecord> {
    const newRecord = new this.model(record);
    const data = await newRecord.save();

    return data.toJSON<models.IRecord>({
      versionKey: false,
      transform: (ret: { _id?: unknown; updatedAt?: unknown }) => {
        delete ret._id;
        delete ret.updatedAt;
      },
    });
  }
}

let recordRepository: RecordRepository;

export function getRecordRepository() {
  if (!recordRepository) {
    recordRepository = new RecordRepository(RecordModel);
  }

  return recordRepository;
}
