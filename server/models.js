const db = require('./db.js')

const get = () => {
  return db.find();
}

const post = (meeting) => {
  return db.create(meeting);
}

const patch = (meeting) => {
  return db.updateOne(meeting, {past: true});
}

const remove = ({meeting}) => {
  return db.deleteOne({_id: meeting});
}

module.exports = { get, post, patch, remove };