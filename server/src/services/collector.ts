import { collectorModel, Collector } from '../models/collector';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const getSingleCollector = (id: string) => {
  return collectorModel.findById(id);
};

export const createCollector = (input: Collector) => {
  return collectorModel.create(input);
};

export const queryCollectors = (query: FilterQuery<Collector>) => {
  return collectorModel.find(query);
};

export const updateCollector = (id: string, input: UpdateQuery<Collector>) => {
  return collectorModel.findByIdAndUpdate(id, input, { new: true });
};

export const deleteCollector = (id: string) => {
  return collectorModel.findByIdAndDelete(id);
};
