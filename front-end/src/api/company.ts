import { apiMethods, ICompany } from "./client";

const { getAll, getOne, deleteOne, updateOne, createOne } = apiMethods;

export const getAllCompanies = async () =>
  await getAll<{ companies: ICompany[] }>("/companies/all");

export const createCompany = async (name: string) =>
  await createOne("/companies/create", { name });
