import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../../config';
import Logger from './logger';

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

export default async (): Promise<Db> => {
  return _connectToDbWithRetry(config.databaseConnectionRetries);
};

async function _connectToDbWithRetry(retries: number): Promise<Db> {
  try {
    return await _getDb();
  } catch (err) {
    if (retries <= 0) {
      Logger.error('❌ Could not connect to MongoDB after multiple attempts.', err);
      throw err;
    }
    Logger.warn(`⚠️ MongoDB connection failed. Retrying... (${retries} retries left)`);
    return _connectToDbWithRetry(retries - 1);
  }
};

async function _getDb() : Promise<Db>{
  const connection = await mongoose.connect(config.databaseURL, {
    serverSelectionTimeoutMS: config.databaseConnectionTimeoutMS,
  });

  return connection.connection.db;
};
