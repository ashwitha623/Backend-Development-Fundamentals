
# Books API – Lab 03

## Description
A REST API built using Node.js, Express.js and SQLite to manage book records.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- Postman

## Database
Database name: books.db

Table name: book

Columns:
- id
- title
- author
- price
- pages

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /books/ | Get all books |
| GET | /books/:bookId/ | Get a specific book |
| POST | /books/ | Add a new book |
| PUT | /books/:bookId/ | Update a book |
| DELETE | /books/:bookId/ | Delete a book |

## Features
- Search books
- Sorting
- Pagination using limit and offset
- Minimum and maximum price filtering
- Request validation
- Error handling
- Appropriate HTTP status codes

## Installation

1. Clone the repository.
2. Navigate to the lab-03 folder.
3. Install dependencies:

   npm install

4. Start the server:

   npm start

## Server
http://localhost:3000/

## Testing
All API endpoints are tested using Postman.

## Author
Ashwitha
