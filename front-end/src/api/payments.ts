import { IPayment, apiMethods } from "./client";

const paymentRoutes = {
  get: "/payments/all",
  getOne: "/payments",
  update: "/payments/update",
  delete: "/payments/delete",
  create: "/payments/create",
};

export type GetAllResponse = {
  payments: IPayment[];
};

export type GetOneResponse = {
  payment: IPayment;
  message: string;
};

type UpdateResponse = {
  payment: IPayment;
  message: string;
};

const { getAll, getOne, deleteOne, updateOne, createOne } = apiMethods;

const getAllpayments = async () =>
  await getAll<GetAllResponse>(paymentRoutes.get);

const getOnePayments = (id: string) =>
  getOne<GetOneResponse>(paymentRoutes.getOne, id);

const updatePayments = (id: string, input: Partial<IPayment>) =>
  updateOne<UpdateResponse, Partial<IPayment>>(paymentRoutes.update, id, input);

const deletePayments = (id: string) =>
  deleteOne<GetOneResponse>(paymentRoutes.delete, id);

const createPayments = (input: Omit<IPayment, "_id">) =>
  createOne<GetOneResponse, Omit<IPayment, "_id">>(paymentRoutes.create, input);

export const paymentClient = {
  getAllpayments,
  getOnePayments,
  updatePayments,
  createPayments,
  deletePayments,
};
