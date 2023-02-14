import { Strategy } from '@ots-share/repository';

import { Configs } from './configs';
import { initDb } from './db';
import { getLogger } from './logger';
import { getRecordService } from './services/record';

const { initStorage } = Strategy.selectRepository(<Strategy.DbTypeEnum>Configs.DB_TYPE);

export async function run() {
  await initDb(() => initStorage(Configs.DB_URL));

  const service = getRecordService();

  getLogger().info('Purger started');

  await service.delete();
}
