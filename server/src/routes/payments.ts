import express from 'express';
const router = express.Router();
import {
  createPaymentController,
  getSinglePaymentController,
  queryPaymentController,
  updatePaymentController,
  deletePaymentController,
} from '../controllers/payment';

router.post('/create', createPaymentController);
router.patch('/update/:id', updatePaymentController);
router.delete('/delete/:id', deletePaymentController);
router.get('/all', queryPaymentController);
router.get('/:id', getSinglePaymentController);

export default router;
