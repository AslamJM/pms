import { areaModel, Area } from '../models/area';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const getSingleArea = (id: string) => {
  return areaModel.findById(id);
};

export const createArea = (input: Area) => {
  return areaModel.create(input);
};

export const queryAreas = (query: FilterQuery<Area>) => {
  return areaModel.find(query);
};

export const updateArea = (id: string, input: UpdateQuery<Area>) => {
  return areaModel.findByIdAndUpdate(id, input, { new: true });
};

export const deleteArea = (id: string) => {
  return areaModel.findByIdAndDelete(id);
};
