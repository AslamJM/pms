"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_1 = require("../controllers/history");
const router = express_1.default.Router();
router.post('/create', history_1.createPaymentHistoryController);
router
    .route('/:id')
    .get(history_1.getAllPaymentHistoryController)
    .patch(history_1.updatePaymentHistoryController)
    .delete(history_1.deletePaymentHistoryController);
exports.default = router;
