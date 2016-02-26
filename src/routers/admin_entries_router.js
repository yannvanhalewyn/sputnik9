var router = require('express').Router()
  , controller = require('../controllers/admin/entries_controller')

router.get('/', controller.middlewares.index, controller.index)
router.get('/:entry_id', controller.middlewares.edit, controller.edit)
router.post('/:entry_id', controller.middlewares.update, controller.update)

module.exports = router;
