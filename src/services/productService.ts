import { CompleteProduct, CreatedProduct } from '../interfaces/CreatedProduct';
import EError from '../interfaces/EError';
import HttpException from '../interfaces/HttpException';
import Product from '../models/Product';

const nameValidation = (product: Product) => {
  if (!product.name) {
    const error = new HttpException(EError.isRequired, 'Name is required');
    throw error;
  }
  if (typeof product.name !== 'string') {
    const error = new HttpException(EError.invalidData, 'Name must be a string');
    throw error;
  }
  if (product.name.length <= 2) {
    const error = new HttpException(
      EError.invalidData, 
      'Name must be longer than 2 characters',
    );
    throw error;
  }
};

const amountValidation = (product: Product) => {
  if (!product.amount) {
    const error = new HttpException(EError.isRequired, 'Amount is required');
    throw error;
  }
  if (typeof product.amount !== 'string') {
    const error = new HttpException(EError.invalidData, 'Amount must be a string');
    throw error;
  }
  if (product.amount.length <= 2) {
    const error = new HttpException(
      EError.invalidData, 
      'Amount must be longer than 2 characters',
    );
    throw error;
  }
};

const create = async (product: Product): Promise<CreatedProduct> => {
  nameValidation(product);
  amountValidation(product);
  const newUser: CreatedProduct = await product.create();
  return newUser;
};

const getAll = async (product: Product): Promise<CompleteProduct[]> => {
  const products: CompleteProduct[] = await product.getAll();
  return products;
};

export default { create, getAll };