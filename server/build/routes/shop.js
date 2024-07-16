"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const shop_1 = require("../controllers/shop");
router.post('/create', shop_1.createShopController);
router.patch('/update/:id', shop_1.updateShopController);
router.delete('/delete/:id', shop_1.deleteShopController);
router.get('/all', shop_1.queryShopController);
router.get('/:id', shop_1.getSingleShopController);
exports.default = router;
