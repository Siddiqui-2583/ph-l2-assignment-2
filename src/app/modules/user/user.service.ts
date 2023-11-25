import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (userData: TUser) => {
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

const getSingleUserFromDb = async (userId: number) => {
  const result = await User.find({ userId });
  return result;
};

const updateUserIntoDb = async (userId: number, updatedUser: TUser) => {
  if (await User.isUserExists(userId)) {
    await User.updateOne({ userId }, updatedUser);
    const result = await User.find({ userId });
    return result;
  } else {
    throw new Error('User doess not exist!');
  }
};

const updateOrdersIntoDb = async (userId: number, newOrder: TOrder) => {
  console.log('user',userId,newOrder)
  if (await User.isUserExists(userId)) {
    const user = await User.find({ userId });
    console.log('user inside',user,newOrder)
    // await User.updateOne({ userId }, updatedUser);
    
    // return result;
  } else {
    throw new Error('User doess not exist!');
  }
};

const deleteUserFromDb = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

export {
  createUserIntoDb,
  deleteUserFromDb,
  getSingleUserFromDb,
  updateUserIntoDb,updateOrdersIntoDb,
  getUsersFromDb,
};
