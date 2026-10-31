const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.send('Welcome to my server')
})

app.get('/about', (request, response) => {
  response.json({
    name: 'Ashwitha',
    section: 'CSE-1E',
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

app.listen(3000)