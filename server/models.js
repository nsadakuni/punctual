const db = require('./db.js')
const mongoose = require('mongoose')

const get = () => {
  return db.meet.find().sort({startTime: 1});
}

const post = (meeting) => {
  if (!meeting._id) {
    console.log(meeting)
    meeting._id = new mongoose.Types.ObjectId();
  }
  return db.meet.updateOne({_id: meeting._id}, {$set: meeting}, {upsert:true});
}

const postMany = (meetings) => {
  return db.meet.insertMany(meetings);
}

const patch = (meeting) => {
  return db.meet.updateOne(meeting, {past: true});
}

const remove = ({meeting}) => {
  return db.meet.deleteOne({_id: meeting});
}

const getTasks = () => {
  return db.task.find()
}

const putTask = ({item, done}) => {
  return db.task.updateOne({item: item}, {done: done})
}

const postTask = ({newItem}) => {
  return db.task.create({item: newItem})
}

const removeTask = (item) => {
  return db.task.deleteOne(item[0])
}

module.exports = { get, post, postMany, patch, remove, getTasks, putTask, postTask, removeTask };