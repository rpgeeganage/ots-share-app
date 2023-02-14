import mongoose, { connect, disconnect } from 'mongoose';

export async function initStorage(mongoConnection: string): Promise<void> {
  mongoose.set('strictQuery', true);

  await connect(mongoConnection, { autoCreate: true });
}

export async function disconnectDb() {
  await disconnect();
}
