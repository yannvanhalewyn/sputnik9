var router = require('express').Router()
  , controller = require('../controllers/admin/entries_controller')

router.get('/', controller.middlewares.index, controller.index)
router.get('/new', controller.middlewares.new, controller.new)
router.post('/preview', controller.middlewares.preview, controller.preview)
router.get('/:entry_id', controller.middlewares.edit, controller.edit)
router.post('/:entry_id', controller.middlewares.update, controller.update)
router.post('/', controller.middlewares.create, controller.create)

module.exports = router;
