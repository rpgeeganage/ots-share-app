import { getRecordRepository, IRecordRepository } from '../repositories/record';

export class RecordService {
  constructor(private readonly repository: IRecordRepository) {}

  async delete(): Promise<void> {
    const deletedCount = await this.repository.deleteOlderThan(new Date());
    console.log(`Deleted records: ${deletedCount}`);
  }
}

let recordService: RecordService;

export async function getRecordService() {
  if (!recordService) {
    const repository = await getRecordRepository();

    recordService = new RecordService(repository);
  }

  return recordService;
}
