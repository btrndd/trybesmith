import { OkPacket, RowDataPacket } from 'mysql2';
import { CompleteUser, CreatedUser } from '../interfaces/CreatedUser';
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

  public async getByUsername(): Promise<CompleteUser> {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ?',
      [this.username],
    );
    return rows[0] as CompleteUser;
  }
}

export default User;