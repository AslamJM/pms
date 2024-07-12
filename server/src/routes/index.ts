import { Router } from 'express';
import { loginUser } from '../services/auth';

import paymentRouter from './payments';
import collectorRouter from './collectors';
import shopRouter from './shop';
import companyRouter from './company';
import areaRouter from './area';
import historyRouter from './history';
import seedRouter from './seed'

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
  seedRouter
};
