import { collectorModel, Collector } from '../models/collector';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';

export const getSingleCollector = (id: string) => {
  return collectorModel.findById(id).populate('payments');
};

export const createCollector = (input: Collector) => {
  return collectorModel.create(input);
};

export const queryCollectors = (query: FilterQuery<Collector>) => {
  return collectorModel.find(query).populate('payments');
};

export const updateCollector = (id: string, input: UpdateQuery<Collector>) => {
  return collectorModel
    .findByIdAndUpdate(id, input, { new: true })
    .populate('payments');
};

export const deleteCollector = (id: string) => {
  return collectorModel.findByIdAndDelete(id);
};

export const addPaymentToCollector = async (
  id: Types.ObjectId,
  payment: Types.ObjectId
) => {
  const collector = await collectorModel.findById(id);
  collector?.payments.push(payment);
  await collector?.save();
};

export const removePaymentFromCollector = async (
  id: Types.ObjectId,
  payment: Types.ObjectId
) => {
  await collectorModel.findByIdAndUpdate(id, {
    $pull: {
      payments: payment,
    },
  });
};
