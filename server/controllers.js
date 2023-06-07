const models = require('./models.js')
const mongoose = require('mongoose')

const get = (req, res) => {
  models.get()
    .then((data) => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
}

const post = (req, res) => {
  if (req.body._id === null) {
    req.body._id = new mongoose.Types.ObjectId();
  }
  models.post(req.body)
    .then(() => res.status(201).send())
    .catch(err => res.status(400).send(err))
}

const patch = (req, res) => {
  models.patch(req.body)
    .then(() => res.status(202).send())
    .catch(err => res.status(401).send(err))
}

const edit = (req, res) => {
  models.edit(req.body)
    .then(() => res.status(202).send())
    .catch(err => res.status(401).send(err))
}

const remove = (req, res) => {
  models.remove(req.body)
    .then(() => res.status(200).send())
    .catch(err => res.status(401).send(err))
}

module.exports = { get, post, patch, edit, remove }