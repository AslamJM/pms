import { Request, Response } from 'express';
import {
  createPaymentHistory,
  updatePaymentHistory,
  getAllPaymentHistoryForPayment,
  deletePaymentHistory,
} from '../services/history';
import { getSinglePayment } from '../services/payment';

export const createPaymentHistoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const history = await createPaymentHistory(req.body);

    let payment = await getSinglePayment(history.payment._id);
    if (!payment) {
      return res.status(404).json({
        message: "payment doesn't exist",
      });
    } else {
      payment.paidAmount = payment?.paidAmount! + history.amount;
      payment.dueAmount = payment.dueAmount - history.amount;
      if (payment.dueAmount === 0) {
        payment.paymentStatus = 'PAID';
      }

      await payment.save();
      return res.status(200).json({
        message: 'payment updated successfully',
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePaymentHistoryController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const history = await deletePaymentHistory(req.params.id);
    const payment = await getSinglePayment(history?.payment._id);
    if (!payment) {
      return res.status(404).json({
        message: "payment doesn't exist",
      });
    } else {
      payment.paidAmount = payment?.paidAmount! - history!.amount;
      payment.dueAmount = payment.dueAmount + history!.amount;
      await payment.save();
      return res.status(200).json({
        message: 'payment history deleted successfully',
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePaymentHistoryController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const history = await updatePaymentHistory(req.params.id, req.body);
    const payment = await getSinglePayment(history?.payment._id);
    if (!payment) {
      return res.status(404).json({
        message: "payment doesn't exist",
      });
    } else {
      if (req.body.amount) {
        payment.paidAmount =
          payment?.paidAmount! - history!.amount + req.body.amount;
        payment.dueAmount =
          payment.dueAmount + history!.amount - req.body.amount;
        await payment.save();
      }
      return res.status(200).json({
        message: 'payment history updated successfully',
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllPaymentHistoryController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const payments = await getAllPaymentHistoryForPayment(req.params.id);
    return res.status(200).json({ payments });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
