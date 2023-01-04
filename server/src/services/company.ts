import { companyModel, Company } from '../models/company';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const getSingleCompany = (id: string) => {
  return companyModel.findById(id);
};

export const createCompany = (input: Company) => {
  return companyModel.create(input);
};

export const queryCompanies = (query: FilterQuery<Company>) => {
  return companyModel.find(query);
};

export const updateCompany = (id: string, input: UpdateQuery<Company>) => {
  return companyModel.findByIdAndUpdate(id, input, { new: true });
};

export const deleteCompany = (id: string) => {
  return companyModel.findByIdAndDelete(id);
};
