
const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'books.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    const PORT = process.env.PORT || 3000

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server Running at http://localhost:${PORT}/`)
    })
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

// GET all books with query parameters
app.get('/books/', async (request, response) => {
  const {
    search_q = '',
    order_by = 'id',
    order = 'ASC',
    limit = '10',
    offset = '0',
    min_price,
    max_price,
  } = request.query

  const allowedColumns = ['id', 'title', 'author', 'price', 'pages']

  if (!allowedColumns.includes(order_by)) {
    return response.status(400).json({
      message: 'Invalid order_by value',
    })
  }

  if (!['ASC', 'DESC'].includes(order.toUpperCase())) {
    return response.status(400).json({
      message: 'Invalid order value',
    })
  }

  const limitValue = Number(limit)
  const offsetValue = Number(offset)

  if (
    !Number.isInteger(limitValue) ||
    !Number.isInteger(offsetValue) ||
    limitValue <= 0 ||
    offsetValue < 0
  ) {
    return response.status(400).json({
      message: 'Invalid limit or offset',
    })
  }


  if (
  (min_price !== undefined && !Number.isFinite(Number(min_price))) ||
  (max_price !== undefined && !Number.isFinite(Number(max_price)))
) {
  return response.status(400).json({
    message: 'Invalid price value',
  })
}

if (
  min_price !== undefined &&
  max_price !== undefined &&
  Number(min_price) > Number(max_price)
) {
  return response.status(400).json({
    message: 'Minimum price cannot be greater than maximum price',
  })
}

  let getBooksQuery = `
    SELECT *
    FROM book
    WHERE title LIKE ?
  `

  const queryParams = [`%${search_q}%`]

  if (min_price !== undefined) {
    getBooksQuery += ' AND price >= ?'
    queryParams.push(Number(min_price))
  }

  if (max_price !== undefined) {
    getBooksQuery += ' AND price <= ?'
    queryParams.push(Number(max_price))
  }

  getBooksQuery += `
    ORDER BY ${order_by} ${order.toUpperCase()}
    LIMIT ? OFFSET ?;
  `

  queryParams.push(limitValue, offsetValue)

  const books = await db.all(getBooksQuery, queryParams)
  response.send(books)
})

app.post('/books/', async (request, response) => {
  const {title, author, price, pages} = request.body

  if (
  typeof title !== 'string' ||
  title.trim() === '' ||
  typeof author !== 'string' ||
  author.trim() === '' ||
  price === undefined ||
  price === null ||
  price === '' ||
  !Number.isFinite(Number(price))
) {
    return response.status(400).json({
      message: 'Title, author and valid price are required',
    })
  }

  const addBookQuery = `
    INSERT INTO book (title, author, price, pages)
    VALUES (?, ?, ?, ?);
  `

  await db.run(addBookQuery, [title, author, Number(price), pages])

  response.status(201).json({
    message: 'Book added successfully',
  })
})

app.put('/books/:bookId/', async (request, response) => {
  const {bookId} = request.params
  const {title, author, price, pages} = request.body

  const checkBookQuery = `SELECT * FROM book WHERE id = ?;`
  const existingBook = await db.get(checkBookQuery, [bookId])

  if (existingBook === undefined) {
    return response.status(404).json({message: 'Book not found'})
  }

  const updateBookQuery = `
    UPDATE book
    SET title = ?, author = ?, price = ?, pages = ?
    WHERE id = ?;
  `

  await db.run(updateBookQuery, [title, author, price, pages, bookId])

  response.status(200).json({message: 'Book updated successfully'})
})

app.delete('/books/:bookId/', async (request, response) => {
  const {bookId} = request.params

  const checkBookQuery = `SELECT * FROM book WHERE id = ?;`
  const existingBook = await db.get(checkBookQuery, [bookId])

  if (existingBook === undefined) {
    return response.status(404).json({message: 'Book not found'})
  }

  const deleteBookQuery = `DELETE FROM book WHERE id = ?;`
  await db.run(deleteBookQuery, [bookId])

  response.status(200).json({message: 'Book deleted successfully'})
})

initializeDBAndServer()
