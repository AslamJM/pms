import express from 'express';
const router = express.Router();
import {
  createAreaController,
  getSingleAreaController,
  queryAreaController,
  updateAreaController,
  deleteAreaController,
} from '../controllers/area';

router.post('/create', createAreaController);
router.patch('/update/:id', updateAreaController);
router.delete('/delete/:id', deleteAreaController);
router.get('/all', queryAreaController);
router.get('/:id', getSingleAreaController);

export default router;
