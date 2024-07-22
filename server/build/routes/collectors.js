"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const collector_1 = require("../controllers/collector");
router.post('/create', collector_1.createCollectorController);
router.patch('/update/:id', collector_1.updateCollectorController);
router.delete('/delete/:id', collector_1.deleteCollectorController);
router.get('/all', collector_1.queryCollectorController);
router.get('/:id', collector_1.getSingleCollectorController);
exports.default = router;
