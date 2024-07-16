"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPaymentHistoryController = exports.updatePaymentHistoryController = exports.deletePaymentHistoryController = exports.createPaymentHistoryController = void 0;
const history_1 = require("../services/history");
const payment_1 = require("../services/payment");
const createPaymentHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield (0, history_1.createPaymentHistory)(req.body);
        let payment = yield (0, payment_1.getSinglePayment)(history.payment._id);
        if (!payment) {
            return res.status(404).json({
                message: "payment doesn't exist",
            });
        }
        else {
            payment.paidAmount = (payment === null || payment === void 0 ? void 0 : payment.paidAmount) + history.amount;
            payment.dueAmount = payment.dueAmount - history.amount;
            if (payment.dueAmount === 0) {
                payment.paymentStatus = 'PAID';
            }
            yield payment.save();
            return res.status(200).json({
                message: 'payment updated successfully',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createPaymentHistoryController = createPaymentHistoryController;
const deletePaymentHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield (0, history_1.deletePaymentHistory)(req.params.id);
        const payment = yield (0, payment_1.getSinglePayment)(history === null || history === void 0 ? void 0 : history.payment._id);
        if (!payment) {
            return res.status(404).json({
                message: "payment doesn't exist",
            });
        }
        else {
            payment.paidAmount = (payment === null || payment === void 0 ? void 0 : payment.paidAmount) - history.amount;
            payment.dueAmount = payment.dueAmount + history.amount;
            yield payment.save();
            return res.status(200).json({
                message: 'payment history deleted successfully',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deletePaymentHistoryController = deletePaymentHistoryController;
const updatePaymentHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield (0, history_1.updatePaymentHistory)(req.params.id, req.body);
        const payment = yield (0, payment_1.getSinglePayment)(history === null || history === void 0 ? void 0 : history.payment._id);
        if (!payment) {
            return res.status(404).json({
                message: "payment doesn't exist",
            });
        }
        else {
            if (req.body.amount) {
                payment.paidAmount =
                    (payment === null || payment === void 0 ? void 0 : payment.paidAmount) - history.amount + req.body.amount;
                payment.dueAmount =
                    payment.dueAmount + history.amount - req.body.amount;
                yield payment.save();
            }
            return res.status(200).json({
                message: 'payment history updated successfully',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.updatePaymentHistoryController = updatePaymentHistoryController;
const getAllPaymentHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield (0, history_1.getAllPaymentHistoryForPayment)(req.params.id);
        return res.status(200).json({ payments });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getAllPaymentHistoryController = getAllPaymentHistoryController;
