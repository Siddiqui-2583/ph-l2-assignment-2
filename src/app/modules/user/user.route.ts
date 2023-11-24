import express from 'express';
import {
  createUser,
  deleteUser,
  getSingleUser,
  getUsers,
} from './user.controller';

const router = express.Router();

router.post('/create', createUser);

router.get('/', getUsers);

router.get('/:userId', getSingleUser);

router.delete('/:userId', deleteUser);

export default router;
