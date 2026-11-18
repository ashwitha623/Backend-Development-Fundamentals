
const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'users.db')
const jwtSecret = process.env.JWT_SECRET

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    await db.exec(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        name TEXT,
        password TEXT
      );
    `)

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`)
    })
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
  }
}

// Register
app.post('/register/', async (request, response) => {
  const {username, name, password} = request.body

  if (!username || !name || !password) {
    return response.status(400).json({
      message: 'All fields are required',
    })
  }

  const existingUser = await db.get(
    'SELECT * FROM user WHERE username = ?',
    [username]
  )

  if (existingUser) {
    return response.status(400).json({
      message: 'User already exists',
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.run(
    'INSERT INTO user (username, name, password) VALUES (?, ?, ?)',
    [username, name, hashedPassword]
  )

  response.status(201).json({
    message: 'User created successfully',
  })
})

// Login
app.post('/login/', async (request, response) => {
  const {username, password} = request.body

  if (!username || !password) {
    return response.status(400).json({
      message: 'Username and password are required',
    })
  }

  const user = await db.get(
    'SELECT * FROM user WHERE username = ?',
    [username]
  )

  if (!user) {
    return response.status(400).json({
      message: 'Invalid user',
    })
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  )

  if (!isPasswordMatched) {
    return response.status(400).json({
      message: 'Invalid password',
    })
  }

  const payload = {
    username: username,
  }

  const jwtToken = jwt.sign(payload, jwtSecret)

  response.status(200).json({
    jwt_token: jwtToken,
  })
})

initializeDBAndServer()
