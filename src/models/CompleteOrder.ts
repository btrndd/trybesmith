import { RowDataPacket } from 'mysql2';
import connection from './connection';
import Order from './Order';

class CompleteOrder extends Order {
  id: number;

  userId: number;

  products: number[];

  constructor(id: number, userId: number, products: number[]) {
    super(userId, products);
    this.id = id;
    this.userId = userId;
    this.products = products;  
  }

  public async getById(): Promise<CompleteOrder | undefined> {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT Trybesmith.Orders.id, Trybesmith.Orders.userId, Trybesmith.Products.id as products
      FROM Trybesmith.Orders
      INNER JOIN Trybesmith.Products
      ON Trybesmith.Orders.id = Trybesmith.Products.orderId
      WHERE Trybesmith.Orders.id = ?`,
      [this.id],
    );
    if (rows[0]) {
      const products = rows.map((row) => row.products);
      const order = {
        id: rows[0].id,
        userId: rows[0].userId,
        products,
      };
      return order as CompleteOrder;
    }
  }
}

export default CompleteOrder;