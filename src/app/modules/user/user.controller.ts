/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { createUserIntoDb, deleteUserFromDb, getSingleUserFromDb, getUsersFromDb } from './user.service';
import UserValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user  = req.body;
    console.log({user})
    const zodParsedData = UserValidationSchema.parse(user);
    // console.log('zodParsedData',zodParsedData)
    const result = await createUserIntoDb(zodParsedData);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error:any) {
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
      message: 'User retrieved successfully!',
      data: result,
    });
  } catch (error:any ) {
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
    const result = await getSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully!',
      data: result,
    });
  } catch (error:any ) {
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
    const result = await deleteUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error:any ) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

export { createUser, getUsers,getSingleUser,deleteUser}