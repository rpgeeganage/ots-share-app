import { Strategy } from '@ots-share/repository';

import { Configs } from './configs';
import { getLogger } from './logger';
import { getRecordService } from './services/record';

const { initStorage } = Strategy.selectRepository(Configs.DB_URL);

let hasStorageInitialised = false;

export async function run() {
  await handleStorage();

  const service = getRecordService();

  getLogger().info('Purger started');

  await service.delete();
}

async function handleStorage() {
  if (!hasStorageInitialised) {
    await initStorage(Configs.DB_URL);

    hasStorageInitialised = true;
  }
}
