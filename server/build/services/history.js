"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentHistory = exports.getAllPaymentHistoryForPayment = exports.updatePaymentHistory = exports.createPaymentHistory = void 0;
const payment_1 = require("../models/payment");
const createPaymentHistory = (input) => {
    return payment_1.updatePaymentModel.create(input);
};
exports.createPaymentHistory = createPaymentHistory;
const updatePaymentHistory = (id, input) => {
    return payment_1.updatePaymentModel.findByIdAndUpdate(id, input, { new: false });
};
exports.updatePaymentHistory = updatePaymentHistory;
const getAllPaymentHistoryForPayment = (paymentId) => {
    return payment_1.updatePaymentModel.find({ payment: paymentId }).populate({
        path: 'collector',
        select: 'name',
    });
};
exports.getAllPaymentHistoryForPayment = getAllPaymentHistoryForPayment;
const deletePaymentHistory = (id) => {
    return payment_1.updatePaymentModel.findByIdAndDelete(id);
};
exports.deletePaymentHistory = deletePaymentHistory;
