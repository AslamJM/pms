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
exports.getMonthlyCompanyIncome = exports.verifyManyController = exports.getInvoiceController = exports.verifyPaymentController = exports.getPaymentsOfSpecificDateController = exports.queryPaymentController = exports.updatePaymentController = exports.deletePaymentController = exports.getSinglePaymentController = exports.createPaymentController = void 0;
const payment_1 = require("./../services/payment");
const payment_2 = require("../services/payment");
const company_1 = require("../services/company");
const payment_3 = require("../models/payment");
const createPaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { input } = req.body;
    try {
        const created = yield (0, payment_2.createPayment)(input);
        return res.status(200).json({
            message: 'payment created successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createPaymentController = createPaymentController;
const getSinglePaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const payment = yield (0, payment_2.getSinglePayment)(id);
        return res.status(200).json({
            payment: payment,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getSinglePaymentController = getSinglePaymentController;
const deletePaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const payment = yield (0, payment_2.deletePayment)(id);
        return res.status(200).json({
            message: 'payment deleted successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deletePaymentController = deletePaymentController;
const updatePaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { input } = req.body;
    try {
        const payment = yield (0, payment_2.updatePayment)(id, input);
        return res.status(200).json({
            message: 'payment updated successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.updatePaymentController = updatePaymentController;
const queryPaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield (0, payment_2.queryPayments)(req.query);
        return res.status(200).json({
            payments: payments,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.queryPaymentController = queryPaymentController;
const getPaymentsOfSpecificDateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield (0, payment_2.getPaymentsOfSpecificDate)(req.query);
        return res.status(200).json({
            payments: payments,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getPaymentsOfSpecificDateController = getPaymentsOfSpecificDateController;
const verifyPaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verified = yield (0, payment_2.verifyPayment)(req.params.id);
        if (verified) {
            return res.status(200).json({
                message: 'payment is verified',
            });
        }
        else {
            return res.status(400).json({
                message: 'fail to verify',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.verifyPaymentController = verifyPaymentController;
const getInvoiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield (0, payment_2.getInvoice)(req.query.invoice);
        return res.status(200).json({
            payment: payment,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getInvoiceController = getInvoiceController;
const verifyManyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    try {
        const payments = yield (0, payment_1.verifyMany)(ids);
        if (payments) {
            return res
                .status(200)
                .json({ message: 'payments verified successfully ' });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.verifyManyController = verifyManyController;
const getMonthlyCompanyIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield payment_3.paymentModel.getPaymentsOfMonth();
        const resObj = {};
        const companies = (yield (0, company_1.queryCompanies)({})).map((c) => c.name);
        if (companies.length > 0) {
            companies.forEach((c) => {
                resObj[c] = 0;
            });
        }
        payments.forEach((p) => {
            //@ts-ignore
            resObj[p.company.name] += p.paidAmount;
        });
        return res.status(200).json(resObj);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getMonthlyCompanyIncome = getMonthlyCompanyIncome;
