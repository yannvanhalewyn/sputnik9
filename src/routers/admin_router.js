var router = require('express').Router()
  , controller = require('../controllers/admin_controller')
  , unlockCodes = require('../controllers/unlock_codes_controller')
  , entriesRouter = require('../routers/admin_entries_router')
  , songsRouter = require('../routers/admin_songs_router')

router.get('/', controller.middlewares.index, controller.index)
router.get('/unlock_codes', unlockCodes.middlewares.index, unlockCodes.index)
router.use('/entries', entriesRouter)
router.use('/songs', songsRouter)
router.get('/users', controller.middlewares.users, controller.users)
router.get('/users.csv', controller.middlewares.users, controller.usersCSV)

module.exports = router;
