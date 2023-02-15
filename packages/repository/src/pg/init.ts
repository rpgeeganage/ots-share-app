import * as pg from 'pg';

let client: pg.PoolClient;

export function getClient(): pg.PoolClient {
  if (!client) {
    throw new Error('Postgress client is not initialised');
  }

  return client;
}

export async function initStorage(connectionString: string, initQuery: string): Promise<void> {
  if (!client) {
    const pool = new pg.Pool({
      connectionString,
    });

    client = await pool.connect();
  }
  await client.query(initQuery);
}
