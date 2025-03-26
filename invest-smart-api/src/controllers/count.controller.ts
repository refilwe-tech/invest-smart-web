import { Request, Response } from 'express';

import { getCountsModel } from "../models";

export const getCounts = async (req: Request, res: Response) => {
  try {
    const counts =  await getCountsModel();
    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch counts' });
  }
};
