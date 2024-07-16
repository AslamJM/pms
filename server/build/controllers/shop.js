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
exports.queryShopController = exports.updateShopController = exports.deleteShopController = exports.getSingleShopController = exports.createShopController = void 0;
const shop_1 = require("../services/shop");
const createShopController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { input } = req.body;
    try {
        const created = yield (0, shop_1.createShop)(input);
        return res.status(200).json({
            message: 'shop created successfully',
            shop: created,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createShopController = createShopController;
const getSingleShopController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const shop = yield (0, shop_1.getSingleShop)(id);
        return res.status(200).json({
            shop: shop,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getSingleShopController = getSingleShopController;
const deleteShopController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const shop = yield (0, shop_1.deleteShop)(id);
        return res.status(200).json({
            message: 'shop deleted successfully',
            shop: shop,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteShopController = deleteShopController;
const updateShopController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { input } = req.body;
    try {
        const shop = yield (0, shop_1.updateShop)(id, input);
        return res.status(200).json({
            message: 'shop updated successfully',
            shop: shop,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.updateShopController = updateShopController;
const queryShopController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shops = yield (0, shop_1.queryShops)(req.query);
        return res.status(200).json({
            shops: shops,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.queryShopController = queryShopController;
