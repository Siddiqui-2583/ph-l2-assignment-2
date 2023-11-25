# ph-l2-assignment-2

## Project Overview 

This project is dedicated to crafting a Node.js Express application utilizing TypeScript, with MongoDB and Mongoose for robust user data and order management. The implementation ensures data integrity through Zod for effective validation.

## Key Features

+ Seamless CRUD operations for user management
+ Streamlined addition of new products to user orders
+ Efficient retrieval of all orders for a specific user
+ Dynamic calculation of the total price of orders for a specific user

## Technologies

+ **Node.js:** Dynamic JavaScript runtime environment
+ **Express:** Web application framework tailored for Node.js
+ **TypeScript:** Elevated JavaScript with static typing
+ **MongoDB:** Versatile NoSQL database
+ **Mongoose:** Advanced Object Document Mapper (ODM) for MongoDB
+ **Zod:** Robust data validation libraries

## Installation and Setup
 - Install Node.js and npm (Node Package Manager)
 - Clone the Project repository
    
```bash
git clone <git-repository-url>
```
- Install project dependencies

```bash
npm install
```
- Commence the development server
     
```bash
npm run dev
```

# API Endpoints

## User Management

- **Create a new user:**
    - Endpoint `POST /api/users`
    - Request Body :

```json
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}

 - Response: Newly created user object.
```

- **Retrieve a list of all users:**
  - Endpoint `GET /api/users`
  - Response: List of user objects.

- **Retrieve a specific user by ID:**
  - Endpoint `GET /api/users/:userId`
  - Response: User object.

- **Update user information:**
  - Endpoint `PUT /api/users/:userId`
  - Request Body: Updated user data
  - Response: Updated user object.

- **Delete a user:**
  - Endpoint `DELETE /api/users/:userId`
  - Response: Success message.

## Order Management
     - **Add a new product to an order:**
          - Endpoint `PUT /api/users/:userId/orders`
          - Request Body:

```json
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}

- Response: Success message.
```

- **Retrieve all orders for a specific user:**
   - Endpoint `GET /api/users/:userId/orders`
   - Response: List of order objects.

- **Calculate the total price of orders for a specific user:**
   - Endpoint `GET /api/users/:userId/orders/total-price`
   - Response: Total price of all orders.

## Error Handling 
### Error response follows the following format:

```json
{
    "success": false,
    "message": "Error message",
    "error": {
        "code": 404,
        "description": "Error description"
    }
}
```

## Contribution
- Contributions are welcome! Feel free to contribute to this project by reporting bugs, suggesting improvements, or submitting pull requests.