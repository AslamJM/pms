import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const db = process.env.MONGO_DB_SERVER;
