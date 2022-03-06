import rescue from 'express-rescue';
import { Request, Response } from 'express';
import Product from '../models/Product';
import { CompleteProduct, CreatedProduct } from '../interfaces/CreatedProduct';
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

const getAll = rescue(async (
  req: Request,
  res: Response,
) => {
  const product = new Product('name', 'amount');
  const result: CompleteProduct[] = await productService.getAll(product);

  res.status(200).json(result);
});

export default { create, getAll };