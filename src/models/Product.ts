import { OkPacket } from 'mysql2';
import { CreatedProduct } from '../interfaces/CreatedProduct';
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

  // public async getByUsername(): Promise<CompleteUser> {
  //   const [rows] = await connection.execute<RowDataPacket[]>(
  //     'SELECT * FROM Trybesmith.Users WHERE username = ?',
  //     [this.username],
  //   );
  //   return rows[0] as CompleteUser;
  // }
}

export default Product;