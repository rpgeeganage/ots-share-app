import mongoose, { connect, disconnect } from 'mongoose';

import { ConfigsType } from './configs';

export function connectDb(config: ConfigsType) {
  mongoose.set('strictQuery', true);

  return connect(config.MONGO_URL, { autoCreate: true });
}

export function disconnectDb() {
  disconnect();
}
