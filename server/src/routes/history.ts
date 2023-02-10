import express from 'express';
import {
  createPaymentHistoryController,
  getAllPaymentHistoryController,
  updatePaymentHistoryController,
  deletePaymentHistoryController,
} from '../controllers/history';

const router = express.Router();

router.post('/create', createPaymentHistoryController);
router
  .route('/:id')
  .get(getAllPaymentHistoryController)
  .patch(updatePaymentHistoryController)
  .delete(deletePaymentHistoryController);

export default router;
