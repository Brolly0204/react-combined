const mongoose = require('mongoose')
const { DB_URL } = require('../config')

mongoose.connect(
  DB_URL,
  { useNewUrlParser: true }
)

const userScheam = new mongoose.Schema({
  user: String,
  age: Number
})

module.exports = mongoose.model('User', userScheam)
