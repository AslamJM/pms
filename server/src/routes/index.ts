import { Router } from 'express';
import { loginUser } from '../services/auth';

import paymentRouter from './payments';
import collectorRouter from './collectors';
import shopRouter from './shop';
import companyRouter from './company';
import areaRouter from './area';

const authRouter = Router();

authRouter.post('/login', loginUser);

export {
  paymentRouter,
  collectorRouter,
  shopRouter,
  companyRouter,
  areaRouter,
  authRouter,
};
