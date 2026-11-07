
# Lab 03 – REST API, Query Parameters, Validation and Debugging

## Student Details

- Name: Samala Ashwitha
- Registration Number: 252U1R1223
- Class & Section: 211 & CSE – 2E
- Year & Term: I Year – II Term
- Subject: Backend Development Fundamentals
- Assessment: Lab Journal – 3
- Submission Date: 07-11-2026

## Project Description

This project implements a REST API using Node.js, Express.js and SQLite to manage book records.

The API supports retrieving, creating, updating and deleting books. It also includes search, sorting, pagination, price filtering and input validation.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- Render
- Git and GitHub

## Project Structure

```text
lab-03/
│
├── app.js
├── books.db
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
└── screenshots/
```

## Database Details

- **Database Name:** books.db
- **Table Name:** book

### Table Columns

| Column | Data Type |
|---|---|
| id | INTEGER |
| title | TEXT |
| author | TEXT |
| price | REAL |
| pages | INTEGER |

## API Endpoints

### 1. Get All Books

**Method:** GET

**Endpoint:** `/books/`

Retrieves all books from the database.

Supported query parameters:

- `search_q` – Search books by title.
- `order_by` – Sort books using a column.
- `order` – Sort in ASC or DESC order.
- `limit` – Specify the number of records.
- `offset` – Skip a specified number of records.
- `min_price` – Filter books with a minimum price.
- `max_price` – Filter books with a maximum price.

### 2. Add a Book

**Method:** POST

**Endpoint:** `/books/`

Adds a new book to the database.

Validates the title, author and price before inserting the record.

Returns status code 201 when successful and 400 for invalid input.

### 3. Update a Book

**Method:** PUT

**Endpoint:** `/books/:bookId/`

Updates an existing book using its ID.

Returns 200 when successful and 404 if the book does not exist.

### 4. Delete a Book

**Method:** DELETE

**Endpoint:** `/books/:bookId/`

Deletes a book using its ID.

Returns 200 when successful and 404 if the book does not exist.

## Features Implemented

- RESTful API endpoints.
- Search books using partial title matching.
- Sorting in ascending and descending order.
- Pagination using limit and offset.
- Minimum and maximum price filtering.
- Input validation.
- Appropriate HTTP status codes.
- Parameterized SQL queries.
- Error messages in JSON format.

## Installation and Execution

### 1. Clone the Repository

```bash
git clone https://github.com/ashwitha623/Backend-Development-Fundamentals.git
```

### 2. Navigate to Lab 03

```bash
cd Backend-Development-Fundamentals/lab-03
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```

The server runs locally at:

`http://localhost:3000/`

## Live Deployment

The Books API is deployed using Render.

**Live API URL:**

https://ashwitha-lab03-books-api.onrender.com/books/

**GitHub Repository:**

https://github.com/ashwitha623/Backend-Development-Fundamentals

## API Testing

All API endpoints and query parameters were tested using Postman.

The following test cases were verified:

- Retrieving all books.
- Searching books by title.
- Sorting books by price.
- Pagination.
- Minimum and maximum price filtering.
- Creating a new book.
- Invalid input validation.
- Updating an existing book.
- Handling a book ID that does not exist.
- Deleting a book.
- Handling invalid query parameters.

## Screenshots

### Server and Database

![Server Running](screenshots/server_running.png)

![Database Records](screenshots/database_records.png)

### GET Requests

![Get All Books](screenshots/get_all_books.png)

![Search Books](screenshots/search_books.png)

![Search and Sort](screenshots/search_and_sort.png)

![Price Range Filter](screenshots/filter_price_range.png)

![Minimum Price Filter](screenshots/filter_min_price.png)

![Maximum Price Filter](screenshots/filter_max_price.png)

### Sorting and Pagination

![Ascending Price Sort](screenshots/sort_price_ascending.png)

![Descending Price Sort](screenshots/sort_price_descending.png)

![First Page](screenshots/pagination_first_page.png)

![Second Page](screenshots/pagination_second_page.png)

### POST Requests

![Create Book](screenshots/post_create_book.png)

![Invalid Price](screenshots/post_invalid_price.png)

![Missing Author](screenshots/post_missing_author.png)

### PUT and DELETE Requests

![Update Book](screenshots/put_update_book.png)

![Book Not Found](screenshots/put_book_not_found.png)

![Delete Book](screenshots/delete_book.png)

![Delete Book Not Found](screenshots/delete_book_not_found.png)

### Invalid Query Parameters

![Invalid Limit](screenshots/invalid_limit.png)

![Invalid Order](screenshots/invalid_order.png)

![Invalid Order By](screenshots/invalid_order_by.png)

## Problems Faced and Solutions

1. **Port Already in Use:** Checked whether another server process was already using the port before restarting the application.

2. **SQLite Deployment Compatibility:** Encountered a native SQLite binary compatibility issue during Render deployment. Updated the SQLite dependency to version 5.1.7 and successfully deployed the service.

3. **Git Path Error:** Corrected the file paths when running Git commands from inside the lab-03 directory.

## Conclusion

Successfully developed and deployed a Books REST API using Node.js, Express.js and SQLite.

This lab helped in understanding REST API development, query parameters, database operations, input validation, debugging, API testing and deployment.

## Author

Samala Ashwitha
