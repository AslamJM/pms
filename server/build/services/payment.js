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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastMonthCompanyPayments = exports.getDuePaymentsByShop = exports.getInvoice = exports.verifyMany = exports.verifyPayment = exports.getPaymentsOfSpecificDate = exports.deletePayment = exports.updatePayment = exports.queryPayments = exports.createPayment = exports.getSinglePayment = void 0;
const payment_1 = require("../models/payment");
const dayjs_1 = __importDefault(require("dayjs"));
const underscore_1 = require("underscore");
const company_1 = require("./company");
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
const getDuePaymentsByShop = () => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield payment_1.paymentModel.find({ dueAmount: { $gt: 0 } }).populate('shop');
    console.log(payments);
    const duePaymentsByShop = payments.reduce((acc, payment) => {
        const shopId = payment.shop._id.toString();
        if (!acc[shopId]) {
            acc[shopId] = {
                shop: payment.shop,
                totalDue: 0,
                lastPaymentDate: payment.paymentDate,
            };
        }
        acc[shopId].totalDue += payment.dueAmount;
        if (new Date(payment.paymentDate) > new Date(acc[shopId].lastPaymentDate)) {
            acc[shopId].lastPaymentDate = payment.paymentDate;
        }
        return acc;
    }, {});
    return Object.values(duePaymentsByShop);
});
exports.getDuePaymentsByShop = getDuePaymentsByShop;
const getLastMonthCompanyPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    const startOfMonth = (0, dayjs_1.default)().subtract(1, 'month').startOf('month').toISOString();
    const endOfMonth = (0, dayjs_1.default)().subtract(1, 'month').endOf('month').toISOString();
    const payments = yield payment_1.paymentModel.find({
        paymentDate: {
            $gte: startOfMonth,
            $lte: endOfMonth,
        },
    }).populate('company');
    const companies = yield (0, company_1.queryCompanies)({});
    const result = companies.map((company) => {
        const companyPayments = payments.filter(p => p.company._id.toString() === company._id.toString());
        const totalPayment = companyPayments.reduce((sum, payment) => sum + payment.totalAmount, 0);
        const paidPayment = companyPayments.reduce((sum, payment) => sum + payment.paidAmount, 0);
        const duePayment = companyPayments.reduce((sum, payment) => sum + payment.dueAmount, 0);
        return {
            companyName: company.name,
            totalPayment,
            paidPayment,
            duePayment,
        };
    });
    return result;
});
exports.getLastMonthCompanyPayments = getLastMonthCompanyPayments;
