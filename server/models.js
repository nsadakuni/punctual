const db = require('./db.js')
const mongoose = require('mongoose')

const get = () => {
  return db.find().sort({startTime: 1});
}

const post = (meeting) => {
  if (!meeting._id) {
    meeting._id = new mongoose.Types.ObjectId();
  }
  console.log(meeting._id)
  return db.updateOne({_id: meeting._id}, {$set: meeting}, {upsert:true});
}

const postMany = (meetings) => {
  return db.insertMany(meetings);
}

const patch = (meeting) => {
  return db.updateOne(meeting, {past: true});
}

const edit = (meeting, params) => {
  return db.updateOne(meeting, params)
}

const remove = ({meeting}) => {
  return db.deleteOne({_id: meeting});
}

module.exports = { get, post, postMany, patch, edit, remove };