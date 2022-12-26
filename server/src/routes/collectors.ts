import express from 'express';
const router = express.Router();
import {
  createCollectorController,
  getSingleCollectorController,
  queryCollectorController,
  updateCollectorController,
  deleteCollectorController,
} from '../controllers/collector';

router.post('/create', createCollectorController);
router.patch('/update/:id', updateCollectorController);
router.delete('/delete/:id', deleteCollectorController);
router.get('/all', queryCollectorController);
router.get('/:id', getSingleCollectorController);

export default router;
