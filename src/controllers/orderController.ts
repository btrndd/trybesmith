import rescue from 'express-rescue';
import { Request, Response } from 'express';
import Order from '../models/Order';
import orderService from '../services/orderService';
import CompleteOrder from '../models/CompleteOrder';

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

const getById = rescue(async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const order = new CompleteOrder(parseInt(id, 10), 1, [1]);
  const result: CompleteOrder = await orderService.getById(order);
  res.status(200).json(result);
});

const getAll = rescue(async (
  req: Request,
  res: Response,
) => {
  const { user } = res.locals;
  const order = new Order(user.id, [1]);
  const result: CompleteOrder[] = await orderService.getAll(order);
  res.status(200).json(result);
});

export default { create, getById, getAll };