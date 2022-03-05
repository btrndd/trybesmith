import { CreatedUser } from '../interfaces/CreatedUser';
import User from '../models/User';

const create = async (user: User): Promise<CreatedUser> => {
  const newUser: CreatedUser = await user.create();
  return newUser;
};

export default { create };