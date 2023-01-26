import { paymentModel, Payment } from '../models/payment';
import { FilterQuery, UpdateQuery } from 'mongoose';
import dayjs from 'dayjs';
import { omit } from 'underscore';

export const getSinglePayment = (id: string) => {
  return paymentModel
    .findById(id)
    .populate('collector')
    .populate('shop')
    .populate('company');
};

export const createPayment = (input: Payment) => {
  return paymentModel.create(input);
};

export const queryPayments = (
  query: FilterQuery<Payment & { from: string; to: string; limit: number }>
) => {
  let filterQuery;
  const { paymentDate, from, to } = query;

  let newquery = omit(query, 'limit');

  if (paymentDate) {
    filterQuery = {
      ...newquery,
      paymentDate: {
        $gte: dayjs(paymentDate).startOf('D').toISOString(),
        $lte: dayjs(paymentDate).endOf('D').toISOString(),
      },
    };
  } else {
    filterQuery = newquery;
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
    .populate('company')
    .populate({
      path: 'shop',
      populate: {
        path: 'region',
      },
    })
    .limit(query.limit);
};

export const updatePayment = (id: string, input: UpdateQuery<Payment>) => {
  return paymentModel
    .findByIdAndUpdate(id, input, { new: true })
    .populate('collector')
    .populate('shop')
    .populate('company');
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

export const verifyMany = (ids: string[]) => {
  return paymentModel.updateMany(
    { _id: { $in: ids } },
    { $set: { verified: true } },
    { multi: true }
  );
};

export const getInvoice = (invoice: string) => {
  return paymentModel
    .findOne({ invoice })
    .populate('collector')
    .populate({
      path: 'shop',
      populate: {
        path: 'region',
      },
    })
    .populate('company');
};
