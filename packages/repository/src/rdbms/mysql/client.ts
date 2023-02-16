import { Knex } from 'knex';

import { getGenericClient } from '../generic_client';

export function getClient(connectionString: string): Knex {
  return getGenericClient('mysql2', connectionString);
}
