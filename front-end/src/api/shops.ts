import { IShop, apiMethods } from "./client";

const shopRoutes = {
  get: "/shops/all",
  getOne: "/shops",
  update: "/shops/update",
  delete: "/shops/delete",
  create: "/shops/create",
};

export type GetAllResponse = {
  shops: IShop[];
};

export type GetOneResponse = {
  shop: IShop;
  message: string;
};

type UpdateResponse = {
  shop: IShop;
  message: string;
};

const { getAll, getOne, deleteOne, updateOne, createOne } = apiMethods;

const getAllShops = async () => await getAll<GetAllResponse>(shopRoutes.get);

const getOneShop = (id: string) =>
  getOne<GetOneResponse>(shopRoutes.getOne, id);

const updateShop = (id: string, input: Partial<IShop>) =>
  updateOne<UpdateResponse, Partial<IShop>>(shopRoutes.update, id, input);

const deleteShop = (id: string) =>
  deleteOne<GetOneResponse>(shopRoutes.delete, id);

const createShop = (input: Omit<IShop, "_id">) =>
  createOne<GetOneResponse, Omit<IShop, "_id">>(shopRoutes.create, input);

export const shopClient = {
  getAllShops,
  getOneShop,
  updateShop,
  createShop,
  deleteShop,
};
