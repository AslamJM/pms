"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollector = exports.updateCollector = exports.queryCollectors = exports.createCollector = exports.getSingleCollector = void 0;
const collector_1 = require("../models/collector");
const getSingleCollector = (id) => {
    return collector_1.collectorModel.findById(id);
};
exports.getSingleCollector = getSingleCollector;
const createCollector = (input) => {
    return collector_1.collectorModel.create(input);
};
exports.createCollector = createCollector;
const queryCollectors = (query) => {
    return collector_1.collectorModel.find(query);
};
exports.queryCollectors = queryCollectors;
const updateCollector = (id, input) => {
    return collector_1.collectorModel.findByIdAndUpdate(id, input, { new: true });
};
exports.updateCollector = updateCollector;
const deleteCollector = (id) => {
    return collector_1.collectorModel.findByIdAndDelete(id);
};
exports.deleteCollector = deleteCollector;
