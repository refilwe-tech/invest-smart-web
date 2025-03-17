import { Request, Response } from 'express';

import {createUserModel,getUsersModel} from '../models';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserModel(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users =  await getUsersModel();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};