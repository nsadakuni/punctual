const models = require('./models.js')

const get = (req, res) => {
  models.get()
    .then((data) => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
}

const post = (req, res) => {
  models.post(req.body)
    .then(() => res.status(201).send())
    .catch(err => res.status(400).send(err))
}

const patch = (req, res) => {
  models.patch(req.body)
    .then(() => res.status(202).send())
    .catch(err => res.status(401).send(err))
}

const remove = (req, res) => {
  models.remove(req.body)
    .then(() => res.status(200).send())
    .catch(err => res.status(401).send(err))
}

const getTasks = (req, res) => {
  models.getTasks()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
}

const putTask = (req, res) => {
  models.putTask(req.body)
    .then(() => res.status(201).send())
    .catch(err => res.status(400).send(err))
}

const postTask = (req, res) => {
  models.postTask(req.body)
    .then(() => res.status(201).send())
    .catch(err => res.status(400).send(err))
}

const removeTask = (req, res) => {
  models.removeTask(req.body)
    .then(() => res.status(200).send())
    .catch(err => res.status(401).send(err))
}

module.exports = { get, post, patch, remove, getTasks, putTask, postTask, removeTask }