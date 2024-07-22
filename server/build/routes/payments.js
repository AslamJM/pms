"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const payment_1 = require("../controllers/payment");
router.post('/create', payment_1.createPaymentController);
router.post('/verify', payment_1.verifyManyController);
router.patch('/update/:id', payment_1.updatePaymentController);
router.delete('/delete/:id', payment_1.deletePaymentController);
router.get('/verify/:id', payment_1.verifyPaymentController);
router.get('/invoice', payment_1.getInvoiceController);
router.get('/company-income', payment_1.getMonthlyCompanyIncome);
router.get('/all', payment_1.queryPaymentController);
router.get('/:id', payment_1.getSinglePaymentController);
exports.default = router;
