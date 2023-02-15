import { IRecord, Strategy } from '@ots-share/repository';

import { Configs } from '../configs';
import { getLogger } from '../logger';

export class RecordService {
  constructor(private readonly repository: IRecord.IRecordPurgeRepository) {}

  async delete(): Promise<void> {
    const deletedCount = await this.repository.deleteOlderThan(new Date());
    getLogger().info(`Deleted records: ${deletedCount}`);
  }
}

let recordService: RecordService;

export function getRecordService() {
  if (!recordService) {
    const recordRepository = Strategy.selectRepository(Configs.DB_URL).getRecordRepository();
    recordService = new RecordService(recordRepository);
  }

  return recordService;
}
