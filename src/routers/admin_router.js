var router = require('express').Router()
  , controller = require('../controllers/admin_controller')
  , entriesRouter = require('../routers/admin_entries_router')

router.get('/', controller.middlewares.index, controller.index)
router.use('/entries', entriesRouter)
router.get('/users', controller.middlewares.users, controller.users)
router.get('/users.csv', controller.middlewares.users, controller.usersCSV)

module.exports = router;
