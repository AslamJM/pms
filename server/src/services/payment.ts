import { paymentModel, Payment } from '../models/payment';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const getSinglePayment = (id: string) => {
  return paymentModel.findById(id).populate('collector').populate('shop');
};

export const createPayment = (input: Payment) => {
  return paymentModel.create(input);
};

export const queryPayments = (query: FilterQuery<Payment>) => {
  return paymentModel.find(query).populate('collector').populate('shop');
};

export const updatePayment = (id: string, input: UpdateQuery<Payment>) => {
  return paymentModel
    .findByIdAndUpdate(id, input, { new: true })
    .populate('collector')
    .populate('shop');
};

export const deletePayment = (id: string) => {
  return paymentModel.findByIdAndDelete(id);
};
