import express from 'express';
const router = express.Router();
import {
  createCompanyController,
  getSingleCompanyController,
  queryCompanyController,
  updateCompanyController,
  deleteCompanyController,
} from '../controllers/company';

router.post('/create', createCompanyController);
router.patch('/update/:id', updateCompanyController);
router.delete('/delete/:id', deleteCompanyController);
router.get('/all', queryCompanyController);
router.get('/:id', getSingleCompanyController);

export default router;
