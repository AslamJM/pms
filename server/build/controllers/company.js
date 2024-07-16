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
exports.queryCompanyController = exports.updateCompanyController = exports.deleteCompanyController = exports.getSingleCompanyController = exports.createCompanyController = void 0;
const company_1 = require("../services/company");
const createCompanyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { input } = req.body;
    try {
        const created = yield (0, company_1.createCompany)(input);
        return res.status(200).json({
            message: 'Company created successfully',
            company: created,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createCompanyController = createCompanyController;
const getSingleCompanyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const company = yield (0, company_1.getSingleCompany)(id);
        return res.status(200).json({
            company: company,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getSingleCompanyController = getSingleCompanyController;
const deleteCompanyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, company_1.deleteCompany)(id);
        return res.status(200).json({
            message: 'Company deleted successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteCompanyController = deleteCompanyController;
const updateCompanyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { input } = req.body;
    try {
        const company = yield (0, company_1.updateCompany)(id, input);
        return res.status(200).json({
            message: 'Company updated successfully',
            company: company,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.updateCompanyController = updateCompanyController;
const queryCompanyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield (0, company_1.queryCompanies)(req.query);
        return res.status(200).json({
            companies: companies,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.queryCompanyController = queryCompanyController;
