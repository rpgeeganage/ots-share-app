import { Strategy } from '@ots-share/repository';

import { Configs } from './configs';
import { getLogger } from './logger';
import { getRecordService } from './services/record';

const { initStorage } = Strategy.selectRepository(Configs.DB_URL);

export async function run() {
  await initStorage(Configs.DB_URL);

  const service = getRecordService();

  getLogger().info('Purger started');

  await service.delete();
}
