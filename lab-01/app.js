const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.send('Welcome to my server')
})

app.get('/about', (request, response) => {
  response.json({
    name: 'Ashwitha',
    section: 'CSE-2E',
  })
})

app.get('/time', (request, response) => {
  response.json({
    currentTime: new Date(),
  })
})

app.use((request, response) => {
  response.status(404).send('Page Not Found')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})