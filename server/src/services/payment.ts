import { paymentModel, Payment } from '../models/payment';
import { FilterQuery, UpdateQuery } from 'mongoose';
import dayjs from 'dayjs';
import { omit } from 'underscore';
import { queryCompanies } from './company';

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

export const getDuePaymentsByShop = async () => {
  const payments = await paymentModel.find({ dueAmount: { $gt: 0 } }).populate('shop');
  const duePaymentsByShop = payments.reduce((acc, payment) => {
    const shopId = payment.shop._id.toString();
    if (!acc[shopId]) {
      acc[shopId] = {
        shop: payment.shop,
        totalDue: 0,
        lastPaymentDate: payment.paymentDate,
      };
    }
    acc[shopId].totalDue += payment.dueAmount;
    if (new Date(payment.paymentDate) > new Date(acc[shopId].lastPaymentDate)) {
      acc[shopId].lastPaymentDate = payment.paymentDate;
    }
    return acc;
  }, {} as Record<string, { shop: any; totalDue: number; lastPaymentDate: Date }>);

  return Object.values(duePaymentsByShop);
};

export const getLastMonthCompanyPayments = async () => {
  const startOfMonth = dayjs().subtract(1, 'month').startOf('month').toISOString();
  const endOfMonth = dayjs().subtract(1, 'month').endOf('month').toISOString();

  const payments = await paymentModel.find({
    paymentDate: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
  }).populate('company');

  const companies = await queryCompanies({});

  const result = companies.map((company) => {
    const companyPayments = payments.filter(p => p.company._id.toString() === company._id.toString());
    const totalPayment = companyPayments.reduce((sum, payment) => sum + payment.totalAmount, 0);
    const paidPayment = companyPayments.reduce((sum, payment) => sum + payment.paidAmount, 0);
    const duePayment = companyPayments.reduce((sum, payment) => sum + payment.dueAmount, 0);

    return {
      companyName: company.name,
      totalPayment,
      paidPayment,
      duePayment,
    };
  });

  return result;
};