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
  const result = await User.findOne({ userId });
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

const deleteUserFromDb = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

const updateOrdersIntoDb = async (userId: number, newOrder: TOrder) => {
  if (await User.isUserExists(userId)) {
    const user = await User.findOne({ userId });

    if (user) {
      let updatedUser: TUser;

      if (user.orders && Array.isArray(user.orders)) {
        const previousOrders = user.orders;
        updatedUser = {
          ...user.toObject(),
          orders: [...previousOrders, newOrder],
        };
      } else {
        updatedUser = { ...user.toObject(), orders: [newOrder] };
      }

      const result = await User.updateOne({ userId }, updatedUser);
      // const result = await User.findOne({ userId });
      return result;
    } else {
      throw new Error('User not found!');
    }
  } else {
    throw new Error('User does not exist!');
  }
};

const getOrdersFromDb = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const user = await User.findOne({ userId });

    if (user) {

      if (user.orders && Array.isArray(user.orders) && user.orders.length > 0) {
        return user.orders;
      } else {
        return null
      }
    } else {
      throw new Error('User not found!');
    }
  } else {
    throw new Error('User does not exist!');
  }
};

const calculateTotalPriceOfOrdersInDb = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      {$match:{userId: userId}},
      {$unwind: "$orders"},
      {
        $group:{
          _id:null,
          totalPrice:{$sum:"$orders.price"}
        }
      }
    ])

    const totalPrice = result.length > 0 ? result[0].totalPrice : 0

    return {totalPrice}
  } else {
    throw new Error('User does not exist!');
  }
};




export {
  createUserIntoDb,
  deleteUserFromDb,
  getSingleUserFromDb,
  updateUserIntoDb,
  updateOrdersIntoDb,
  getUsersFromDb,getOrdersFromDb,calculateTotalPriceOfOrdersInDb
};
