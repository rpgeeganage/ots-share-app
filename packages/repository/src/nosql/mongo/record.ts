import { models } from '@ots-share/model';

import { IRecordPurgeRepository, IRecordRepository } from '../../interfaces/record';

import { RecordModel } from './models/record';

export class RecordRepository implements IRecordRepository, IRecordPurgeRepository {
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

  async deleteOlderThan(date: Date): Promise<number> {
    const { deletedCount } = await this.model.deleteMany({
      expiary: {
        $lt: date,
      },
    });

    return deletedCount;
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

let recordRepository: IRecordRepository & IRecordPurgeRepository;

export function getRecordRepository(): IRecordRepository & IRecordPurgeRepository {
  if (!recordRepository) {
    recordRepository = new RecordRepository(RecordModel);
  }

  return recordRepository;
}
