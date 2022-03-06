import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import HttpException from '../interfaces/HttpException';
import EError from '../interfaces/EError';

dotenv.config();

const JWT_SECRET = 'Meusegredo';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new HttpException(EError.notAuthorized, 'Token not found');
    throw error;
  }
  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET,
      { algorithms: ['HS256'] },
    );
    console.log(decoded);
    // req.username = decoded.username;
    next();    
  } catch {
    res.status(401).json({ error: 'Invalid token' });    
  }  
};

export default { auth };