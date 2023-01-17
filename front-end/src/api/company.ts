import { apiMethods, ICompany, IArea } from "./client";

const { getAll, getOne, deleteOne, updateOne, createOne } = apiMethods;

export const getAllCompanies = async () =>
  await getAll<{ companies: ICompany[] }>("/companies/all");

export const createCompany = async (name: string) =>
  await createOne("/companies/create", { name });

export const getAllAreas = async () =>
  await getAll<{ areas: IArea[] }>("/areas/all");

export const createArea = async (name: string) =>
  await createOne("/areas/create", { name });
