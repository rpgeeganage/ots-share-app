import mongoose, { connect, disconnect } from 'mongoose';

let isConnected = false;

export async function initStorage(mongoConnection: string): Promise<void> {
  if (!isConnected) {
    mongoose.set('strictQuery', true);

    await connect(mongoConnection, { autoCreate: true });

    isConnected = true;
  }
}

export async function disconnectDb() {
  await disconnect();
}
