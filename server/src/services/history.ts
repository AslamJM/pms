import { UpdatePayment, updatePaymentModel } from '../models/payment';

export const createPaymentHistory = (input: UpdatePayment) => {
  return updatePaymentModel.create(input);
};

export const updatePaymentHistory = (
  id: string,
  input: Partial<UpdatePayment>
) => {
  return updatePaymentModel.findByIdAndUpdate(id, input, { new: false });
};

export const getAllPaymentHistoryForPayment = (paymentId: string) => {
  return updatePaymentModel.find({ payment: paymentId }).populate({
    path: 'collector',
    select: 'name',
  });
};

export const deletePaymentHistory = (id: string) => {
  return updatePaymentModel.findByIdAndDelete(id);
};
