import rescue from 'express-rescue';
import { Request, Response } from 'express';
import { CreatedUser } from '../interfaces/CreatedUser';
import User from '../models/User';
import userService from '../services/userService';

const create = rescue(async (
  req: Request,
  res: Response,
) => {
  const { username, classe, level, password } = req.body;
  const newUser = new User(username, classe, level, password);
  // if (!name) {
  //   const error = {
  //     code: 'requiredParameter',
  //     message: '"name" is required',
  //   };
  //   throw error;
  // }
  // if (!quantity && quantity !== 0) {
  //   const error = {
  //     code: 'requiredParameter',
  //     message: '"quantity" is required',
  //   };
  //   throw error;
  // }

  const result: CreatedUser = await userService.create(newUser);
  res.status(201).json(result);
});

export default { create };