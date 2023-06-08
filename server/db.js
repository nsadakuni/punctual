const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/punctual')

const schema = mongoose.Schema({
  title: String,
  url: String,
  startTime: Number,
  endTime: Number,
  past: {type: Boolean, default: false}
})

const todoSchema = mongoose.Schema({
  item: String,
  done: {type: Boolean, default: false}
})

const meet = mongoose.model('punctual', schema)
const task = mongoose.model('todo', todoSchema)

module.exports = {meet, task}
