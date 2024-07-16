"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArea = exports.updateArea = exports.queryAreas = exports.createArea = exports.getSingleArea = void 0;
const area_1 = require("../models/area");
const getSingleArea = (id) => {
    return area_1.areaModel.findById(id);
};
exports.getSingleArea = getSingleArea;
const createArea = (input) => {
    return area_1.areaModel.create(input);
};
exports.createArea = createArea;
const queryAreas = (query) => {
    return area_1.areaModel.find(query);
};
exports.queryAreas = queryAreas;
const updateArea = (id, input) => {
    return area_1.areaModel.findByIdAndUpdate(id, input, { new: true });
};
exports.updateArea = updateArea;
const deleteArea = (id) => {
    return area_1.areaModel.findByIdAndDelete(id);
};
exports.deleteArea = deleteArea;
