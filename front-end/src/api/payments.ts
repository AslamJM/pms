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

interface PaymentCreateInput {
  invoice: string;
  shop: string;
  amount: number;
  paidAmount: number;
  free: number;
  discount: number;
  returnAmount: number;
  dueAmount: number;
  paymentDate: Date;
  dueDate: Date;
  paymentStatus: string;
  paymentMethod: string;
  collector: string;
  verified: boolean;
}

const { getAll, getOne, deleteOne, updateOne, createOne } = apiMethods;

const getAllpayments = async () =>
  await getAll<GetAllResponse>(paymentRoutes.get);

const getOnePayment = (id: string) =>
  getOne<GetOneResponse>(paymentRoutes.getOne, id);

const updatePayment = (id: string, input: Partial<IPayment>) =>
  updateOne<UpdateResponse, Partial<IPayment>>(paymentRoutes.update, id, input);

const deletePayment = (id: string) =>
  deleteOne<GetOneResponse>(paymentRoutes.delete, id);

const createPayment = (input: PaymentCreateInput) =>
  createOne<GetOneResponse, PaymentCreateInput>(paymentRoutes.create, input);

export const paymentClient = {
  getAllpayments,
  getOnePayment,
  updatePayment,
  createPayment,
  deletePayment,
};
