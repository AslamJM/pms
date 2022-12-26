import express from 'express';
const router = express.Router();
import {
  createShopController,
  getSingleShopController,
  queryShopController,
  updateShopController,
  deleteShopController,
} from '../controllers/shop';

router.post('/create', createShopController);
router.patch('/update/:id', updateShopController);
router.delete('/delete/:id', deleteShopController);
router.get('/all', queryShopController);
router.get('/:id', getSingleShopController);

export default router;
