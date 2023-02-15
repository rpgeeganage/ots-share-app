import mongoose, { connect, disconnect } from 'mongoose';

const connectionStrings = new Set();

export async function initStorage(mongoConnection: string): Promise<void> {
  if (!connectionStrings.has(mongoConnection)) {
    mongoose.set('strictQuery', true);

    await connect(mongoConnection, { autoCreate: true });

    connectionStrings.add(mongoConnection);
  }
}

export async function disconnectDb() {
  await disconnect();
}
