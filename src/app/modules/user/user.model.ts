/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';

import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'street is required'],
  },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [1, 'Product name must have at least 1 character'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Price must be at least 1'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
});

const userSchema = new Schema<TUser>(
  {
    userId: { type: Number, unique: true },
    username: { type: String, unique: true },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },
    fullName: {
      type: fullNameSchema,
      required: [true, 'Full name is required'],
    },
    age: { type: Number, required: [true, 'Age is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    isActive: {
      type: Boolean,
      enum: ['active', 'inactive'],
      required: [true, 'isActive is required'],
    },
    hobbies: {
      type: [String],
      required: [true, 'hobbies is required'],
    },
    address: { type: addressSchema, required: [true, 'Address is required'] },
    orders: orderSchema,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual

// userSchema.virtual('fullName').get(function () {
//   return `${this.fullName.firstName} ${this.fullName.lastName}`;
// });

// pre save middleware

userSchema.pre('save', async function (next) {
  console.log('Pre save', this);
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

userSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

userSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

userSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId:id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
