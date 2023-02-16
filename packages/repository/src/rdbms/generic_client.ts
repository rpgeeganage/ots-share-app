// eslint-disable-next-line import/no-named-as-default
import knex, { Knex } from 'knex';

let client: Knex;

export function getGenericClient(type: string, connection: string) {
  if (!client) {
    client = knex({
      client: type,
      connection,
    });
  }

  return client;
}
