var router = require('express').Router()
  , controller = require('../controllers/admin/songs_controller')

router.get('/', controller.middlewares.index, controller.index)
router.get('/new', controller.middlewares.new, controller.new)
router.get('/:song_id', controller.middlewares.edit, controller.edit)
router.post('/:song_id', controller.middlewares.update, controller.update)
router.post('/', controller.middlewares.create, controller.create)
router.delete('/:song_id', controller.middlewares.delete, controller.delete)

module.exports = router;
