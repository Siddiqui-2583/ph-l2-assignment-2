import { z } from 'zod';


const FullNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const AddressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const OrderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number().min(1),
});

// Define the main schema for TUser
export const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20),
  fullName: FullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
  isDeleted: z.boolean().default(false),
});

export default UserValidationSchema;
// Validate function to use the schema
// export function validateUser(user: unknown) {
//   try {
//     return UserSchema.parse(user);
//   } catch (error) {
//     if (error instanceof ZodError) {
//       console.error(error.errors);
//     }
//     throw error;
//   }
// }
