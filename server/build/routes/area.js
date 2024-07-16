"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const area_1 = require("../controllers/area");
router.post('/create', area_1.createAreaController);
router.patch('/update/:id', area_1.updateAreaController);
router.delete('/delete/:id', area_1.deleteAreaController);
router.get('/all', area_1.queryAreaController);
router.get('/:id', area_1.getSingleAreaController);
exports.default = router;
