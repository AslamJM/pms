import { ICollector, apiMethods } from "./client";

const collectorRoutes = {
  get: "/collectors/all",
  getOne: "/collectors",
  update: "/collectors/update",
  delete: "/collectors/delete",
  create: "/collectors/create",
};

export type GetAllResponse = {
  collectors: ICollector[];
};

export type GetOneResponse = {
  collector: ICollector;
  message: string;
};

type UpdateResponse = {
  collector: ICollector;
  message: string;
};

const { getAll, getOne, deleteOne, updateOne, createOne } = apiMethods;

const getAllCollectors = async () =>
  await getAll<GetAllResponse>(collectorRoutes.get);

const getOneCollector = (id: string) =>
  getOne<GetOneResponse>(collectorRoutes.getOne, id);

const updateCollector = (id: string, input: Partial<ICollector>) =>
  updateOne<UpdateResponse, Partial<ICollector>>(
    collectorRoutes.update,
    id,
    input
  );

const deleteCollector = (id: string) =>
  deleteOne<GetOneResponse>(collectorRoutes.delete, id);

const createCollector = (input: Omit<ICollector, "_id">) =>
  createOne<GetOneResponse, Omit<ICollector, "_id">>(
    collectorRoutes.create,
    input
  );

export const collectorClient = {
  getAllCollectors,
  getOneCollector,
  updateCollector,
  createCollector,
  deleteCollector,
};
