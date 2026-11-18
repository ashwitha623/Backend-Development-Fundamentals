
# Lab 04 - Registration, Login and JWT Authentication

## Student Details
- Name: Ashwitha Samala
- Course: B.Tech CSE
- Year: 2nd Year

## Description
This project implements user registration and login using Node.js, Express.js, SQLite, bcrypt, and JSON Web Tokens (JWT).

## Features
- User registration
- Password hashing using bcrypt
- Duplicate username validation
- User login
- Password verification using bcrypt
- JWT token generation
- Input validation

## Technologies Used
- Node.js
- Express.js
- SQLite
- bcrypt
- jsonwebtoken

## Installation

1. Navigate to the lab-04 folder.
2. Install dependencies:

   npm install

## Run the Application

   npm start

The server runs at:

http://localhost:3000/

## API Endpoints

### 1. Register User
- Method: POST
- Endpoint: /register/
- Description: Registers a new user after validating the required fields and hashing the password.

### 2. Login User
- Method: POST
- Endpoint: /login/
- Description: Verifies user credentials and generates a JWT token after successful login.

## Testing Screenshots

Screenshots are available in the screenshots folder:

1. register_success.png
2. login_success.png
3. invalid_password.png
4. duplicate_user.png
5. missing_fields.png

## Security
- Passwords are hashed using bcrypt before storing them.
- JWT tokens are generated after successful authentication.
- SQL queries use parameterized inputs.
