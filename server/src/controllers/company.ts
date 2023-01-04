import { Request, Response } from 'express';
import {
  createCompany,
  getSingleCompany,
  queryCompanies,
  updateCompany,
  deleteCompany,
} from '../services/company';
import { Company } from '../models/company';
import { UpdateQuery } from 'mongoose';

export const createCompanyController = async (
  req: Request<{}, {}, { input: Company }>,
  res: Response
) => {
  const { input } = req.body;
  try {
    const created = await createCompany(input);
    return res.status(200).json({
      message: 'Company created successfully',
      company: created,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleCompanyController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const company = await getSingleCompany(id);
    return res.status(200).json({
      company: company,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCompanyController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const company = await deleteCompany(id);
    return res.status(200).json({
      message: 'Company deleted successfully',
      company: company,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCompanyController = async (
  req: Request<{ id: string }, {}, { input: UpdateQuery<Company> }>,
  res: Response
) => {
  const { id } = req.params;
  const { input } = req.body;
  try {
    const company = await updateCompany(id, input);
    return res.status(200).json({
      message: 'Company updated successfully',
      company: company,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const queryCompanyController = async (req: Request, res: Response) => {
  try {
    const companies = await queryCompanies(req.query);
    return res.status(200).json({
      companies: companies,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
