import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/db';
import { PORT } from './utils/config';
import { shopRouter, paymentRouter, collectorRouter } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/ping', (_, res) => res.send('ping'));

app.use('/shops', shopRouter);
app.use('/payments', paymentRouter);
app.use('/collectors', collectorRouter);

const createServer = async () => {
  await connectDB();
  console.log('database connected');

  app.listen(PORT, () =>
    console.log(`server started at http://localhost:${PORT}`)
  );
};

createServer();
