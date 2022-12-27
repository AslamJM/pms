import { shopModel, Shop } from '../models/shops';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';

export const getSingleShop = (id: string) => {
  return shopModel.findById(id).populate('payments');
};

export const createShop = (input: Shop) => {
  return shopModel.create(input);
};

export const queryShops = (query: FilterQuery<Shop>) => {
  return shopModel.find(query).populate('payments');
};

export const updateShop = (id: string, input: UpdateQuery<Shop>) => {
  return shopModel
    .findByIdAndUpdate(id, input, { new: true })
    .populate('payments');
};

export const deleteShop = (id: string) => {
  return shopModel.findByIdAndDelete(id);
};

export const addPayment = async (
  id: Types.ObjectId,
  payment: Types.ObjectId
) => {
  const shop = await shopModel.findById(id);
  shop?.payments.push(payment);
  await shop?.save();
};

export const removePayment = async (
  id: Types.ObjectId,
  payment: Types.ObjectId
) => {
  await shopModel.findByIdAndUpdate(id, {
    $pull: {
      payments: payment,
    },
  });
};
