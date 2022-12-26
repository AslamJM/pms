import mongoose from 'mongoose';
import { db } from './config';

export async function connectDB() {
  try {
    mongoose.connect(db);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
