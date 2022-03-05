import rescue from 'express-rescue';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CreatedUser } from '../interfaces/CreatedUser';
import User from '../models/User';
import userService from '../services/userService';

const create = rescue(async (
  req: Request,
  res: Response,
) => {
  const { username, classe, level, password } = req.body;
  const newUser = new User(username, classe, level, password);
  const result: CreatedUser = await userService.create(newUser);

  const { JWT_SECRET } = process.env;
  const token = jwt.sign(
    { id: result.id, username: result.username },
    JWT_SECRET || '',
    { expiresIn: '1d', algorithm: 'HS256' },
  );

  res.status(201).json({ token });
});

export default { create };