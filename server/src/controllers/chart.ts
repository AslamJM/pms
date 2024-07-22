import { Request,Response } from "express";
import { getPieChart } from "../services/chart";

export const getpieController = async (
    req: Request<{},{},{},{month:number}>,
    res: Response
  ) => {
    const { month } = req.query
    try {
      const data = await getPieChart(month)
      return res.status(200).json({
        data
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };