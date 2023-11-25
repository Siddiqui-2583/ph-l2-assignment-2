import express from 'express';
import {
  createUser,
  deleteUser,
  getSingleUser,
  getUsers,
  updateOrders,
  updateUser,
} from './user.controller';

const router = express.Router();

router.post('/create', createUser);

router.get('/:userId', getSingleUser);

router.get('/', getUsers);

router.put('/:userId', updateUser);

router.put('/:userId/orders', updateOrders);

router.delete('/:userId', deleteUser);

export default router;
