import mongoose, { connect, disconnect } from 'mongoose';

export function connectDb(mongoConnection: string) {
  mongoose.set('strictQuery', true);

  return connect(mongoConnection, { autoCreate: true });
}

export function disconnectDb() {
  disconnect();
}
