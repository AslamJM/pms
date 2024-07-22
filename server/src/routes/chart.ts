import express from 'express';
const router = express.Router();
import {
  getpieController
} from '../controllers/chart';


router.get('/pie', getpieController);

export default router;
