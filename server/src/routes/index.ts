import { Router } from 'express';
import { loginUser } from '../services/auth';

import paymentRouter from './payments';
import collectorRouter from './collectors';
import shopRouter from './shop';
import companyRouter from './company';
import areaRouter from './area';
import historyRouter from './history';
<<<<<<< HEAD
import chartRouter from  './chart'
=======
import seedRouter from './seed'
>>>>>>> e061a6c6d06022164cc9d4df20aa2033991cc1b3

const authRouter = Router();

authRouter.post('/login', loginUser);

export {
  paymentRouter,
  collectorRouter,
  shopRouter,
  companyRouter,
  areaRouter,
  authRouter,
  historyRouter,
<<<<<<< HEAD
  chartRouter
=======
  seedRouter
>>>>>>> e061a6c6d06022164cc9d4df20aa2033991cc1b3
};
