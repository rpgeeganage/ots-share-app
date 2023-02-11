import { MongoClient, Db } from 'mongodb';

import { Configs } from './configs';

let dbClient: Db;

export async function getDbClient(): Promise<Db> {
  if (!dbClient) {
    const client = new MongoClient(Configs.MONGO_URL);
    await client.connect();
    dbClient = client.db();
  }

  return dbClient;
}
