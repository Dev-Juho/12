const express = require('express')
const morgan = require('morgan')
const app = express()


const { requestLogger, unknownEndpoint, errorHandler } = require('./middleware')
const indexRouter = require('./controllers/index')
const apiRouter = require('./controllers/api')
const corsMiddleware = require('./middleware/headers')
const path = require('path')

const CLIENT_BUILD_PATH = path.join(__dirname, "dist")

app.use(express.static(CLIENT_BUILD_PATH))

app.use(corsMiddleware)

app.use(express.json())

app.use(requestLogger)


morgan.token('post-data', (req, res) => {
  const body = req.body
  let data = { name: body.name, number: body.number } 
  return JSON.stringify(data)
}
)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

app.use('', indexRouter)
app.use('/api', apiRouter)

app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'), (error) => {
    res.status(500).send('server error:', error.message)
  })
})

app.use(unknownEndpoint)
app.use(errorHandler)


module.exports = app;