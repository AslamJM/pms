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
exports.queryCollectorController = exports.updateCollectorController = exports.deleteCollectorController = exports.getSingleCollectorController = exports.createCollectorController = void 0;
const collector_1 = require("../services/collector");
const createCollectorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { input } = req.body;
    try {
        const created = yield (0, collector_1.createCollector)(input);
        return res.status(200).json({
            message: 'collector created successfully',
            collector: created,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createCollectorController = createCollectorController;
const getSingleCollectorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const collector = yield (0, collector_1.getSingleCollector)(id);
        return res.status(200).json({
            collector: collector,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getSingleCollectorController = getSingleCollectorController;
const deleteCollectorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const collector = yield (0, collector_1.deleteCollector)(id);
        return res.status(200).json({
            message: 'collector deleted successfully',
            collector: collector,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteCollectorController = deleteCollectorController;
const updateCollectorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { input } = req.body;
    try {
        const collector = yield (0, collector_1.updateCollector)(id, input);
        return res.status(200).json({
            message: 'collector updated successfully',
            collector: collector,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.updateCollectorController = updateCollectorController;
const queryCollectorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectors = yield (0, collector_1.queryCollectors)(req.query);
        return res.status(200).json({
            collectors: collectors,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.queryCollectorController = queryCollectorController;
