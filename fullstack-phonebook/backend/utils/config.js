require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS

module.exports = {
  MONGODB_URI,
  PORT,
  ALLOWED_ORIGINS
}