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
exports.queryAreaController = exports.updateAreaController = exports.deleteAreaController = exports.getSingleAreaController = exports.createAreaController = void 0;
const area_1 = require("../services/area");
const createAreaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { input } = req.body;
    try {
        const created = yield (0, area_1.createArea)(input);
        return res.status(200).json({
            message: 'Area created successfully',
            Area: created,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createAreaController = createAreaController;
const getSingleAreaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const Area = yield (0, area_1.getSingleArea)(id);
        return res.status(200).json({
            Area: Area,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getSingleAreaController = getSingleAreaController;
const deleteAreaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, area_1.deleteArea)(id);
        return res.status(200).json({
            message: 'Area deleted successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteAreaController = deleteAreaController;
const updateAreaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { input } = req.body;
    try {
        const Area = yield (0, area_1.updateArea)(id, input);
        return res.status(200).json({
            message: 'Area updated successfully',
            Area: Area,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.updateAreaController = updateAreaController;
const queryAreaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = yield (0, area_1.queryAreas)(req.query);
        return res.status(200).json({
            areas: areas,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.queryAreaController = queryAreaController;
