import { IRecordPurgeRepository, IRecordRepository } from './record';

export interface IRepositoryStrategy {
  getRecordRepository: () => IRecordPurgeRepository & IRecordRepository;
  initStorage: (connectionString: string) => Promise<void>;
}
