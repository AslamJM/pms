import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});

export interface IPayment {
  _id: string;
  invoice: string;
  shop: IShop;
  company: ICompany;
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
  collector: ICollector;
  verified: boolean;
}

export interface ICollector {
  _id: string;
  name: string;
  phone: string;
  email: string;
}

export interface IShop {
  _id: string;
  name: string;
  address: string;
  region: string;
}

export interface ICompany {
  _id: string;
  name: string;
}

// client queries
const getAll = async <T>(route: string) => {
  const response = await apiClient.get<T>(route);
  return response.data;
};

const getOne = async <T>(route: string, params: string) => {
  const response = await apiClient.get<T>(route, {
    params,
  });
  return response.data;
};

const updateOne = async <T, K>(route: string, params: string, update: K) => {
  const response = await apiClient.patch<T>(`${route}/${params}`, {
    input: { ...update },
  });
  return response.data;
};

const deleteOne = async <T>(route: string, params: string) => {
  const response = await apiClient.delete<T>(`${route}/${params}`);
  return response.data;
};

const createOne = async <T, K>(route: string, body: K) => {
  const response = await apiClient.post<T>(route, {
    input: {
      ...body,
    },
  });
  return response.data;
};

export const queryPayments = async (params: any) => {
  const response = await apiClient.get<{ payments: IPayment[] }>(
    "/payments/all",
    {
      params,
    }
  );
  return response.data;
};

export const getPaymentsForDate = async (params: { date: string }) => {
  const response = await apiClient.get<{ payments: IPayment[] }>(
    "/payments/date",
    {
      params,
    }
  );
  return response.data;
};

export const apiMethods = { getAll, getOne, updateOne, deleteOne, createOne };
