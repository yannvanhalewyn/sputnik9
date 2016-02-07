var controller = require('../controllers/users_controller')
  , pswd_controller = require('../controllers/passwords_controller')
  , router = require('express').Router();

router.get('/me', controller.middlewares.show, controller.show)
router.post('/me', controller.middlewares.update, controller.update)
router.get('/verify', controller.verify);
router.get('/resend_verification',
           controller.middlewares.resend_verification,
           controller.resend_verification)
router.get('/get-premium',
           controller.middlewares.use_unlock_code,
           controller.use_unlock_code)
router.get('/unsubscribe', controller.unsubscribe)
router.post('/', controller.create);

// Password resets
router.get('/forgot', (req, res) => res.render('forgotten_password'))
router.post('/forgot', pswd_controller.forgot)
router.get('/reset/:token', pswd_controller.middlewares.show_reset_password,
                            pswd_controller.show_reset_password)
router.post('/reset/:token', pswd_controller.middlewares.reset_password,
                             pswd_controller.reset_password)

module.exports = router;
