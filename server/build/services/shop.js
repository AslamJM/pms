"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShop = exports.updateShop = exports.queryShops = exports.createShop = exports.getSingleShop = void 0;
const shops_1 = require("../models/shops");
const getSingleShop = (id) => {
    return shops_1.shopModel.findById(id);
};
exports.getSingleShop = getSingleShop;
const createShop = (input) => {
    return shops_1.shopModel.create(input);
};
exports.createShop = createShop;
const queryShops = (query) => {
    return shops_1.shopModel.find(query).populate('region');
};
exports.queryShops = queryShops;
const updateShop = (id, input) => {
    return shops_1.shopModel.findByIdAndUpdate(id, input, { new: true });
};
exports.updateShop = updateShop;
const deleteShop = (id) => {
    return shops_1.shopModel.findByIdAndDelete(id);
};
exports.deleteShop = deleteShop;
