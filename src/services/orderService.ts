import EError from '../interfaces/EError';
import HttpException from '../interfaces/HttpException';
import Order from '../models/Order';

const productsValidation = (order: Order) => {
  if (!order.products) {
    const error = new HttpException(EError.isRequired, 'Products is required');
    throw error;
  }
  if (order.products.length <= 0) {
    const error = new HttpException(
      EError.invalidData, 
      'Products can\'t be empty',
    );
    throw error;
  }
  if (typeof order.products[0] !== 'number') {
    const error = new HttpException(EError.invalidData, 'Products must be an array of numbers');
    throw error;
  }  
};

const create = async (order: Order): Promise<Order> => {
  productsValidation(order);
  const newOrder: Order = await order.create();
  return newOrder;
};

export default { create };