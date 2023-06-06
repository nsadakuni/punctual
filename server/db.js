const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/punctual')

const schema = mongoose.Schema({
  title: String,
  url: String,
  time: Number,
  past: {type: Boolean, default: false}
})

const db = mongoose.model('punctual', schema)

module.exports = db