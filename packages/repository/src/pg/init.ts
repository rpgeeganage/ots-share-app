import { PoolClient, Pool } from 'pg';

let client: PoolClient;

export function getClient(): PoolClient {
  if (!client) {
    throw new Error('Postgress client is not initialised');
  }

  return client;
}

export async function initStorage(connectionString: string, initQuery: string): Promise<void> {
  if (!client) {
    const pool = new Pool({
      connectionString,
    });

    client = await pool.connect();
  }

  await client.query(initQuery);
}
