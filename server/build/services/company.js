"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.updateCompany = exports.queryCompanies = exports.createCompany = exports.getSingleCompany = void 0;
const company_1 = require("../models/company");
const getSingleCompany = (id) => {
    return company_1.companyModel.findById(id);
};
exports.getSingleCompany = getSingleCompany;
const createCompany = (input) => {
    return company_1.companyModel.create(input);
};
exports.createCompany = createCompany;
const queryCompanies = (query) => {
    return company_1.companyModel.find(query);
};
exports.queryCompanies = queryCompanies;
const updateCompany = (id, input) => {
    return company_1.companyModel.findByIdAndUpdate(id, input, { new: true });
};
exports.updateCompany = updateCompany;
const deleteCompany = (id) => {
    return company_1.companyModel.findByIdAndDelete(id);
};
exports.deleteCompany = deleteCompany;
