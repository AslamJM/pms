import express from 'express';
const router = express.Router();
import {
  createPaymentController,
  getSinglePaymentController,
  queryPaymentController,
  updatePaymentController,
  deletePaymentController,
  verifyPaymentController,
  getInvoiceController,
} from '../controllers/payment';

router.post('/create', createPaymentController);
router.patch('/update/:id', updatePaymentController);
router.delete('/delete/:id', deletePaymentController);
router.get('/verify/:id', verifyPaymentController);
router.get('/invoice', getInvoiceController);
router.get('/all', queryPaymentController);
router.get('/:id', getSinglePaymentController);

export default router;
