"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoice = exports.verifyMany = exports.verifyPayment = exports.getPaymentsOfSpecificDate = exports.deletePayment = exports.updatePayment = exports.queryPayments = exports.createPayment = exports.getSinglePayment = void 0;
const payment_1 = require("../models/payment");
const dayjs_1 = __importDefault(require("dayjs"));
const underscore_1 = require("underscore");
const getSinglePayment = (id) => {
    return payment_1.paymentModel
        .findById(id)
        .populate('collector')
        .populate('shop')
        .populate('company');
};
exports.getSinglePayment = getSinglePayment;
const createPayment = (input) => {
    return payment_1.paymentModel.create(input);
};
exports.createPayment = createPayment;
const queryPayments = (query) => {
    let filterQuery;
    const { paymentDate, from, to } = query;
    let newquery = (0, underscore_1.omit)(query, 'limit');
    if (paymentDate) {
        filterQuery = Object.assign(Object.assign({}, newquery), { paymentDate: {
                $gte: (0, dayjs_1.default)(paymentDate).startOf('D').toISOString(),
                $lte: (0, dayjs_1.default)(paymentDate).endOf('D').toISOString(),
            } });
    }
    else {
        filterQuery = newquery;
    }
    if (from && to) {
        filterQuery = Object.assign(Object.assign({}, filterQuery), { paymentDate: {
                $gte: (0, dayjs_1.default)(from).startOf('D').toISOString(),
                $lte: (0, dayjs_1.default)(to).endOf('D').toISOString(),
            } });
    }
    return payment_1.paymentModel
        .find(filterQuery)
        .sort({ paymentDate: 'descending' })
        .populate('collector')
        .populate('company')
        .populate({
        path: 'shop',
        populate: {
            path: 'region',
        },
    })
        .limit(query.limit);
};
exports.queryPayments = queryPayments;
const updatePayment = (id, input) => {
    return payment_1.paymentModel
        .findByIdAndUpdate(id, input, { new: true })
        .populate('collector')
        .populate('shop')
        .populate('company');
};
exports.updatePayment = updatePayment;
const deletePayment = (id) => {
    return payment_1.paymentModel.findByIdAndDelete(id);
};
exports.deletePayment = deletePayment;
const getPaymentsOfSpecificDate = ({ date }) => {
    return payment_1.paymentModel.getPaymentsOfDay(date);
};
exports.getPaymentsOfSpecificDate = getPaymentsOfSpecificDate;
const verifyPayment = (id) => {
    return payment_1.paymentModel.findByIdAndUpdate(id, { verified: true });
};
exports.verifyPayment = verifyPayment;
const verifyMany = (ids) => {
    return payment_1.paymentModel.updateMany({ _id: { $in: ids } }, { $set: { verified: true } }, { multi: true });
};
exports.verifyMany = verifyMany;
const getInvoice = (invoice) => {
    return payment_1.paymentModel
        .findOne({ invoice })
        .populate('collector')
        .populate({
        path: 'shop',
        populate: {
            path: 'region',
        },
    })
        .populate('company');
};
exports.getInvoice = getInvoice;
