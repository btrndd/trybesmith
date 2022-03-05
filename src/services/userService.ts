import { CreatedUser } from '../interfaces/CreatedUser';
import EError from '../interfaces/EError';
import HttpException from '../interfaces/HttpException';
import User from '../models/User';

const usernameValidation = (user: User) => {
  if (!user.username) {
    const error = new HttpException(EError.isRequired, 'Username is required');
    throw error;
  }
  if (typeof user.username !== 'string') {
    const error = new HttpException(EError.invalidData, 'Username must be a string');
    throw error;
  }
  if (user.username.length <= 2) {
    const error = new HttpException(
      EError.invalidData, 
      'Username must be longer than 2 characters',
    );
    throw error;
  }
};

const classeValidation = (user: User) => {
  if (!user.classe) {
    const error = new HttpException(EError.isRequired, 'Classe is required');
    throw error;
  }
  if (typeof user.classe !== 'string') {
    const error = new HttpException(EError.invalidData, 'Classe must be a string');
    throw error;
  }
  if (user.classe.length <= 2) {
    const error = new HttpException(
      EError.invalidData, 
      'Classe must be longer than 2 characters',
    );
    throw error;
  }
};

const levelValidation = (user: User) => {
  if (!user.level) {
    const error = new HttpException(EError.isRequired, 'Level is required');
    throw error;
  }
  if (typeof user.level !== 'number') {
    const error = new HttpException(EError.invalidData, 'Level must be a string');
    throw error;
  }
  if (user.level <= 0) {
    const error = new HttpException(
      EError.invalidData, 
      'Level must be greater than 0',
    );
    throw error;
  }
};

const passwordValidation = (user: User) => {
  if (!user.password) {
    const error = new HttpException(EError.isRequired, 'Password is required');
    throw error;
  }
  if (typeof user.password !== 'string') {
    const error = new HttpException(EError.invalidData, 'Password must be a string');
    throw error;
  }
  if (user.password.length <= 7) {
    const error = new HttpException(
      EError.invalidData, 
      'Password must be longer than 7 characters',
    );
    throw error;
  }
};

const create = async (user: User): Promise<CreatedUser> => {
  usernameValidation(user);
  classeValidation(user);
  levelValidation(user);
  passwordValidation(user);
  const newUser: CreatedUser = await user.create();
  return newUser;
};

export default { create };