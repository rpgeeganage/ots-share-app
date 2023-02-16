import { schema } from '../models/';

import { getClient } from './client';

export async function initStorage(connectionString: string): Promise<void> {
  await schema.createSchemas(getClient(connectionString));
}
