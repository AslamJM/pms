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
exports.getpieController = void 0;
const chart_1 = require("../services/chart");
const getpieController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { month } = req.query;
    try {
        const data = yield (0, chart_1.getPieChart)(month);
        return res.status(200).json({
            data
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getpieController = getpieController;
