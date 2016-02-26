var router = require('express').Router()
  , controller = require('../controllers/admin/entries_controller')

router.get('/', controller.middlewares.index, controller.index)
router.get('/:id', controller.middlewares.edit, controller.edit)
router.post('/:id', controller.middlewares.update, controller.update)

module.exports = router;
