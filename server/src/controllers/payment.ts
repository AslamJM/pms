import { Request, Response } from 'express';
import { verifyMany } from './../services/payment';
import {
  createPayment,
  getSinglePayment,
  queryPayments,
  updatePayment,
  deletePayment,
  getPaymentsOfSpecificDate,
  verifyPayment,
  getInvoice,
} from '../services/payment';
import { queryCompanies } from '../services/company';
import { paymentModel } from '../models/payment';
import { Payment } from '../models/payment';
import { UpdateQuery } from 'mongoose';

export const createPaymentController = async (
  req: Request<{}, {}, { input: Payment }>,
  res: Response
) => {
  const { input } = req.body;
  try {
    const created = await createPayment(input);

    return res.status(200).json({
      message: 'payment created successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSinglePaymentController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const payment = await getSinglePayment(id);
    return res.status(200).json({
      payment: payment,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePaymentController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const payment = await deletePayment(id);

    return res.status(200).json({
      message: 'payment deleted successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePaymentController = async (
  req: Request<{ id: string }, {}, { input: UpdateQuery<Payment> }>,
  res: Response
) => {
  const { id } = req.params;
  const { input } = req.body;
  try {
    const payment = await updatePayment(id, input);
    return res.status(200).json({
      message: 'payment updated successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const queryPaymentController = async (req: Request, res: Response) => {
  try {
    const payments = await queryPayments(req.query);
    return res.status(200).json({
      payments: payments,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPaymentsOfSpecificDateController = async (
  req: Request<{}, {}, {}, { date: string }>,
  res: Response
) => {
  try {
    const payments = await getPaymentsOfSpecificDate(req.query);
    return res.status(200).json({
      payments: payments,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyPaymentController = async (req: Request, res: Response) => {
  try {
    const verified = await verifyPayment(req.params.id);
    if (verified) {
      return res.status(200).json({
        message: 'payment is verified',
      });
    } else {
      return res.status(400).json({
        message: 'fail to verify',
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getInvoiceController = async (
  req: Request<{}, {}, {}, { invoice: string }>,
  res: Response
) => {
  try {
    const payment = await getInvoice(req.query.invoice);
    return res.status(200).json({
      payment: payment,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyManyController = async (
  req: Request<{}, {}, { ids: string[] }>,
  res: Response
) => {
  const { ids } = req.body;
  try {
    const payments = await verifyMany(ids);
    if (payments) {
      return res
        .status(200)
        .json({ message: 'payments verified successfully ' });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMonthlyCompanyIncome = async (req: Request, res: Response) => {
  try {
    const payments = await paymentModel.getPaymentsOfMonth();
    const resObj: Record<string, number> = {};

    const companies = (await queryCompanies({})).map((c) => c.name);
    if (companies.length > 0) {
      companies.forEach((c) => {
        resObj[c] = 0;
      });
    }

    payments.forEach((p) => {
      //@ts-ignore
      resObj[p.company.name] += p.paidAmount;
    });
    return res.status(200).json(resObj);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
