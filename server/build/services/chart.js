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
exports.getPieChart = void 0;
const payment_1 = require("../models/payment");
const area_1 = require("./area");
const getPieChart = (month) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = yield (0, area_1.queryAreas)({});
        const labels = areas.map(a => a.name);
        const payments = yield payment_1.paymentModel.find().populate({
            path: 'shop',
            populate: {
                path: 'region',
            },
        });
        const pie = {};
        labels.forEach(l => {
            pie[l] = 0;
        });
        payments.forEach(p => {
            if (p.shop) {
                //@ts-ignore
                pie[p.shop.region.name] = p.paidAmount;
            }
        });
        return {
            labels: Object.keys(pie),
            data: Object.values(pie)
        };
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.getPieChart = getPieChart;
