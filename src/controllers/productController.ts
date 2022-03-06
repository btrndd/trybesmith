import rescue from 'express-rescue';
import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
import Product from '../models/Product';
import { CreatedProduct } from '../interfaces/CreatedProduct';
import productService from '../services/productService';

const create = rescue(async (
  req: Request,
  res: Response,
) => {
  const { name, amount } = req.body;
  const newProduct = new Product(name, amount);
  const result: CreatedProduct = await productService.create(newProduct);

  res.status(201).json({ item: result });
});

export default { create };