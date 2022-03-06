import rescue from 'express-rescue';
import { Request, Response } from 'express';
import Order from '../models/Order';
import orderService from '../services/orderService';

const create = rescue(async (
  req: Request,
  res: Response,
) => {
  const { products } = req.body;
  const { user } = res.locals;
  const newOrder = new Order(user.id, products);
  const result: Order = await orderService.create(newOrder);

  res.status(201).json({ order: result });
});

export default { create };