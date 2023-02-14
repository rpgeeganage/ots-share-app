import { IRecordPurgeRepository, IRecordRepository } from './record';

export interface IRepositoryStrategy {
  recordRepository: IRecordPurgeRepository & IRecordRepository;
}
