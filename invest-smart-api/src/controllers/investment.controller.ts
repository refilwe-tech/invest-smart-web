import { Request, Response } from 'express';

import { getInvestmentsModel } from "../models";

export const getInvestments = async (req: Request, res: Response) => {
  try {
    const investments =  await getInvestmentsModel();
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch investments' });
  }
};
