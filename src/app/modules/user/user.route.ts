import express from 'express';
import {
  calculateTotalPriceOfOrders,
  createUser,
  deleteUser,
  getOrders,
  getSingleUser,
  getUsers,
  updateOrders,
  updateUser,
} from './user.controller';

const router = express.Router();

router.post('/', createUser);

router.get('/:userId', getSingleUser);

router.get('/', getUsers);

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);

router.put('/:userId/orders', updateOrders);

router.get('/:userId/orders/total-price', calculateTotalPriceOfOrders);

router.get('/:userId/orders', getOrders);

export default router;
