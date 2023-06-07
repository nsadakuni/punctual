const db = require('./db.js')

const get = () => {
  return db.find().sort({startTime: 1});
}

const post = (meeting) => {
  return db.create(meeting);
}

const postMany = (meetings) => {
  return db.insertMany(meetings);
}

const patch = (meeting) => {
  return db.updateOne(meeting, {past: true});
}

const remove = ({meeting}) => {
  return db.deleteOne({_id: meeting});
}

module.exports = { get, post, postMany, patch, remove };