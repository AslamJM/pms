import { Request, Response } from 'express';
import {
  createPayment,
  getSinglePayment,
  queryPayments,
  updatePayment,
  deletePayment,
} from '../services/payment';
import { Payment } from '../models/payment';
import { UpdateQuery } from 'mongoose';
import { addPayment, removePayment } from '../services/shop';
import {
  addPaymentToCollector,
  removePaymentFromCollector,
} from '../services/collector';

export const createPaymentController = async (
  req: Request<{}, {}, { input: Payment }>,
  res: Response
) => {
  const { input } = req.body;
  try {
    const created = await createPayment(input);
    await addPayment(created.shop._id, created._id);
    await addPaymentToCollector(created.collector._id, created._id);
    return res.status(200).json({
      message: 'payment created successfully',
      payment: created,
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
    removePayment(payment?.shop._id, payment?._id);
    removePaymentFromCollector(payment?.collector._id, payment?._id);
    return res.status(200).json({
      message: 'payment deleted successfully',
      payment: payment,
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
      payment: payment,
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
      shops: payments,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
