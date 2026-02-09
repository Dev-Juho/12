const http = require('http');
const cors = require('cors')
const mongoose = require('mongoose')
const app = require('./app')
const { MONGODB_URI, PORT, ALLOWED_ORIGINS } = require('./utils/config')


mongoose.connect(MONGODB_URI)
.then(_result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

app.use(cors({
  origin: ALLOWED_ORIGINS,
}))


const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



