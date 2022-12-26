import { Request, Response } from 'express';
import {
  createCollector,
  getSingleCollector,
  updateCollector,
  deleteCollector,
  queryCollectors,
} from '../services/collector';
import { Collector } from '../models/collector';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const createCollectorController = async (
  req: Request<{}, {}, { input: Collector }>,
  res: Response
) => {
  const { input } = req.body;
  try {
    const created = await createCollector(input);
    return res.status(200).json({
      message: 'collector created successfully',
      collector: created,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleCollectorController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const collector = await getSingleCollector(id);
    return res.status(200).json({
      collector: collector,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCollectorController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const collector = await deleteCollector(id);
    return res.status(200).json({
      message: 'collector deleted successfully',
      collector: collector,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCollectorController = async (
  req: Request<{ id: string }, {}, { input: UpdateQuery<Collector> }>,
  res: Response
) => {
  const { id } = req.params;
  const { input } = req.body;
  try {
    const collector = await updateCollector(id, input);
    return res.status(200).json({
      message: 'collector updated successfully',
      collector: collector,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const queryCollectorController = async (req: Request, res: Response) => {
  try {
    const collectors = await queryCollectors(req.query);
    return res.status(200).json({
      collectors: collectors,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
