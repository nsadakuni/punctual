const router = require('express').Router()
const controllers = require('./controllers.js')

router.get('/meetings', controllers.get)
router.post('/meetings', controllers.post)
router.put('/meetings', controllers.patch)
router.delete('/meetings', controllers.remove)

module.exports = router;