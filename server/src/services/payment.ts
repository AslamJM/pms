import { paymentModel, Payment } from '../models/payment';
import { FilterQuery, UpdateQuery } from 'mongoose';
import dayjs from 'dayjs';

export const getSinglePayment = (id: string) => {
  return paymentModel.findById(id).populate('collector').populate('shop');
};

export const createPayment = (input: Payment) => {
  return paymentModel.create(input);
};

export const queryPayments = (
  query: FilterQuery<Payment & { from: string; to: string }>
) => {
  let filterQuery;
  const { paymentDate, from, to } = query;

  if (paymentDate) {
    filterQuery = {
      ...query,
      paymentDate: {
        $gte: dayjs(paymentDate).startOf('D').toISOString(),
        $lte: dayjs(paymentDate).endOf('D').toISOString(),
      },
    };
  } else {
    filterQuery = query;
  }

  if (from && to) {
    filterQuery = {
      ...filterQuery,
      paymentDate: {
        $gte: dayjs(from).startOf('D').toISOString(),
        $lte: dayjs(to).endOf('D').toISOString(),
      },
    };
  }

  return paymentModel
    .find(filterQuery)
    .sort({ paymentDate: 'descending' })
    .populate('collector')
    .populate('shop')
    .populate('company');
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

export const getPaymentsOfSpecificDate = ({ date }: { date: string }) => {
  return paymentModel.getPaymentsOfDay(date);
};

export const verifyPayment = (id: string) => {
  return paymentModel.findByIdAndUpdate(id, { verified: true });
};

export const getInvoice = (invoice: string) => {
  return paymentModel
    .findOne({ invoice })
    .populate('collector')
    .populate('shop');
};
