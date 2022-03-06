import { OkPacket, RowDataPacket } from 'mysql2';
import { CompleteProduct, CreatedProduct } from '../interfaces/CreatedProduct';
import connection from './connection';

class Product {
  name: string;

  amount: string;

  constructor(name: string, amount: string) {
    this.name = name;    
    this.amount = amount;   
  }

  public async create(): Promise<CreatedProduct> {
    const [rows] = await connection.execute<OkPacket>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [this.name, this.amount],
    );
    const createdProduct = {
      id: rows.insertId,
      name: this.name,
      amount: this.amount,
    };
    return createdProduct;
  }

  public async getAll(): Promise<CompleteProduct[]> {
    const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM Trybesmith.Products');
    console.log(this.name);
    return rows as CompleteProduct[];
  }
}

export default Product;