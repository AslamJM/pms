import { Request, Response } from 'express';
import {
  createShop,
  getSingleShop,
  queryShops,
  updateShop,
  deleteShop,
} from '../services/shop';
import { Shop } from '../models/shops';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const createShopController = async (
  req: Request<{}, {}, { input: Shop }>,
  res: Response
) => {
  const { input } = req.body;
  try {
    const created = await createShop(input);
    return res.status(200).json({
      message: 'shop created successfully',
      shop: created,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleShopController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const shop = await getSingleShop(id);
    return res.status(200).json({
      shop: shop,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteShopController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const shop = await deleteShop(id);
    return res.status(200).json({
      message: 'shop deleted successfully',
      shop: shop,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateShopController = async (
  req: Request<{ id: string }, {}, { input: UpdateQuery<Shop> }>,
  res: Response
) => {
  const { id } = req.params;
  const { input } = req.body;
  try {
    const shop = await updateShop(id, input);
    return res.status(200).json({
      message: 'shop updated successfully',
      shop: shop,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const queryShopController = async (req: Request, res: Response) => {
  try {
    const shops = await queryShops(req.query);
    return res.status(200).json({
      shops: shops,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
