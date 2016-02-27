var router = require('express').Router()
  , controller = require('../controllers/admin/songs_controller')

router.get('/', controller.middlewares.index, controller.index)
router.post('/', controller.middlewares.update, controller.update)

module.exports = router;
