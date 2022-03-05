import { OkPacket } from 'mysql2';
import { CreatedUser } from '../interfaces/CreatedUser';
import connection from './connection';

class User {
  username: string;

  classe: string;

  level: number;

  password: string;

  constructor(username: string, classe: string, level: number, password: string) {
    this.username = username;
    this.classe = classe;
    this.level = level;
    this.password = password;
  }

  public async create(): Promise<CreatedUser> {
    const [rows] = await connection.execute<OkPacket>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [this.username, this.classe, this.level, this.password],
    );
    const createdUser = {
      id: rows.insertId,
      username: this.username,
      classe: this.classe,
      level: this.level,
    };
    return createdUser;
  }

  // public static async getAll(): Promise<User> {
  //   const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM products');
  //   return rows as User[];
  // }
}

export default User;