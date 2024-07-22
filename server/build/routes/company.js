"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const company_1 = require("../controllers/company");
router.post('/create', company_1.createCompanyController);
router.patch('/update/:id', company_1.updateCompanyController);
router.delete('/delete/:id', company_1.deleteCompanyController);
router.get('/all', company_1.queryCompanyController);
router.get('/:id', company_1.getSingleCompanyController);
exports.default = router;
