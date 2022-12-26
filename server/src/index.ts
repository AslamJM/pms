import express from 'express';
import cors from 'cors';

import { connectDB } from './utils/db';
import { PORT } from './utils/config';

const app = express();
app.use(express.json());
app.use(cors());

const createServer = async () => {
  await connectDB();
  console.log('database connected');

  app.listen(PORT, () =>
    console.log(`server started at http://localhost:${PORT}`)
  );
};

createServer();
