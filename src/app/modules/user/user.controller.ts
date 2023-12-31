/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import {
  calculateTotalPriceOfOrdersInDb,
  createUserIntoDb,
  deleteUserFromDb,
  getOrdersFromDb,
  getSingleUserFromDb,
  getUsersFromDb,
  updateOrdersIntoDb,
  updateUserIntoDb,
} from './user.service';
import UserValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    console.log({ user });
    const zodParsedData = UserValidationSchema.parse(user);
    // console.log('zodParsedData',zodParsedData)
    const result = await createUserIntoDb(zodParsedData);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await getUsersFromDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await getSingleUserFromDb(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUser = req.body
    const result = await updateUserIntoDb(Number(userId),updatedUser);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await deleteUserFromDb(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const updateOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const newOrder = req.body
    await updateOrdersIntoDb(Number(userId),newOrder);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await getOrdersFromDb(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const calculateTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await calculateTotalPriceOfOrdersInDb(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};






export { createUser, getUsers, getSingleUser, updateUser,updateOrders, deleteUser,getOrders ,calculateTotalPriceOfOrders };
