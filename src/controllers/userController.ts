import rescue from 'express-rescue';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CompleteUser, CreatedUser } from '../interfaces/CreatedUser';
import User from '../models/User';
import userService from '../services/userService';

const create = rescue(async (
  req: Request,
  res: Response,
) => {
  const { username, classe, level, password } = req.body;
  const newUser = new User(username, classe, level, password);
  const result: CreatedUser = await userService.create(newUser);

  const JWT_SECRET = 'Meusegredo';
  const token = jwt.sign(
    { id: result.id, username: result.username },
    JWT_SECRET || '',
    { expiresIn: '1d', algorithm: 'HS256' },
  );

  res.status(201).json({ token });
});

const login = rescue(async (
  req: Request,
  res: Response,
) => {
  const existingUser = new User(req.body.username, 'classe', 1, req.body.password);
  const response: CompleteUser = await userService.login(existingUser);

  const JWT_SECRET = 'Meusegredo';
  const token = jwt.sign(
    { id: response.id, username: response.username },
    JWT_SECRET || '',
    { expiresIn: '1d', algorithm: 'HS256' },
  );

  res.status(200).json({ token });
});

export default { create, login };