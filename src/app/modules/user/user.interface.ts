/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  isDeleted: boolean;
}

// Static methods

export interface UserModel extends Model<TUser> {
  isUserExists(id: number): Promise<TUser | null>;
}

// custom instance method
// export interface UserMethods{
//   isUserExists(id:string):Promise<TUser | null>;
// }

// export type UserModel = Model<TUser, Record<string, never>,UserMethods>
