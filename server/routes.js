const router = require('express').Router()
const controllers = require('./controllers.js')

router.get('/meetings', controllers.get)
router.put('/meetings', controllers.patch)
router.post('/meetings', controllers.post)
router.delete('/meetings', controllers.remove)

router.get('/tasks', controllers.getTasks)
router.put('/tasks', controllers.putTask)
router.post('/tasks', controllers.postTask)
router.delete('/tasks',controllers.removeTask)

module.exports = router;