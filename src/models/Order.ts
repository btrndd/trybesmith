import { OkPacket } from 'mysql2';
import connection from './connection';

class Order {
  userId: number;

  products: number[];

  constructor(userId: number, products: number[]) {
    this.userId = userId;
    this.products = products;  
  }

  public async create(): Promise<Order> {
    const [rows] = await connection.execute<OkPacket>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [this.userId],
    );
    const queries = this.products.map(async (product) =>
      connection.execute<OkPacket>(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
        [rows.insertId, product],
      ));
    await Promise.all(queries);
    const order = {
      userId: this.userId,
      products: this.products,
    };
    return order as Order;
  }
}

export default Order;