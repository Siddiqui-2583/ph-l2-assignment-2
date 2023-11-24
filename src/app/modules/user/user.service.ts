import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (userData: TUser) => {
  //   const user = new User(userData);
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  } else {
    const result = await User.create(userData);
    return result;
  }
};

const getUsersFromDb = async () => {
  const result = await User.find().select('-password');
  return result;
};
const getSingleUserFromDb = async (id: string) => {
  const result = await User.find({ id });
  return result;
};
const deleteUserFromDb = async (id: string) => {
  const result = await User.updateOne({ id }, { isDeleted: true });
  return result;
};

export {
  createUserIntoDb,
  deleteUserFromDb,
  getSingleUserFromDb,
  getUsersFromDb,
};
