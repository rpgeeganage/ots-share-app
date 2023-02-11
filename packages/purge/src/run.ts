import { getRecordService } from './services/record';

export async function run() {
  const service = await getRecordService();
  console.log(`[${new Date().toISOString()}]: Purger started`);
  await service.delete();
}
