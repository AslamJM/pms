import { apiMethods, ICompany, IArea, IShop } from "./client";
import { createShop } from '../../../server/src/services/shop';

const { getAll, getOne, deleteOne, updateOne, createOne } = apiMethods;

export const getAllCompanies = async () =>
  await getAll<{ companies: ICompany[] }>("/companies/all");

export const createCompany = async (name: string) =>
  await createOne("/companies/create", { name });

export const getAllAreas = async () =>
  await getAll<{ areas: IArea[] }>("/areas/all");

export const createArea = async (name: string) =>
  await createOne("/areas/create", { name });

export const getAllShops = async () =>
  await getAll<{
    shops: IShop[]; areas: IShop[] 
}>("/shops/all");

export const createShops = async (name: string) =>
  await createOne("/shops/create", { name });