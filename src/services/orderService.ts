import { CreatedOrder } from '../interfaces/CreatedOrder';
import EError from '../interfaces/EError';
import HttpException from '../interfaces/HttpException';
import CompleteOrder from '../models/CompleteOrder';
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

const getById = async (order: CompleteOrder): Promise<CompleteOrder> => {
  const newOrder: CompleteOrder | undefined = await order.getById();
  if (!newOrder) {
    const error = new HttpException(EError.notFound, 'Order not found');
    throw error;
  }
  return newOrder;
};

const getAll = async (order: Order): Promise<CompleteOrder[]> => {
  const ordersList: CreatedOrder[] = await order.getAll();
  
  const orders: CompleteOrder[] = ordersList.map(
    (ord) => new CompleteOrder(ord.id, ord.userId, []),
  );

  const queries = orders.map(async (ordr) => ordr.getById());
  const result = await Promise.all(queries);

  return result as CompleteOrder[];
};

export default { create, getById, getAll };