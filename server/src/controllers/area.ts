import { Request, Response } from 'express';
import {
  createArea,
  getSingleArea,
  queryAreas,
  updateArea,
  deleteArea,
} from '../services/area';
import { Area } from '../models/area';
import { UpdateQuery } from 'mongoose';

export const createAreaController = async (
  req: Request<{}, {}, { input: Area }>,
  res: Response
) => {
  const { input } = req.body;
  try {
    const created = await createArea(input);
    return res.status(200).json({
      message: 'Area created successfully',
      Area: created,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleAreaController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const Area = await getSingleArea(id);
    return res.status(200).json({
      Area: Area,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAreaController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    await deleteArea(id);
    return res.status(200).json({
      message: 'Area deleted successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateAreaController = async (
  req: Request<{ id: string }, {}, { input: UpdateQuery<Area> }>,
  res: Response
) => {
  const { id } = req.params;
  const { input } = req.body;
  try {
    const Area = await updateArea(id, input);
    return res.status(200).json({
      message: 'Area updated successfully',
      Area: Area,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const queryAreaController = async (req: Request, res: Response) => {
  try {
    const areas = await queryAreas(req.query);
    return res.status(200).json({
      areas: areas,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
