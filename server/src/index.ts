import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/db';
import { PORT } from './utils/config';
import {
  shopRouter,
  paymentRouter,
  collectorRouter,
  companyRouter,
  areaRouter,
  authRouter,
  historyRouter,
} from './routes';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + '/../static'));

app.use('/api/users', authRouter);
app.use('/api/shops', shopRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/collectors', collectorRouter);
app.use('/api/companies', companyRouter);
app.use('/api/areas', areaRouter);
app.use('/api/history', historyRouter);

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname + '/../static/index.html'));
});

const createServer = async () => {
  await connectDB();
  console.log('database connected');

  app.listen(PORT, () =>
    console.log(`server started at http://localhost:${PORT}`)
  );
};

createServer();
