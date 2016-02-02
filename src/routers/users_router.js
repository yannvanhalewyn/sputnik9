var controller = require('../controllers/users_controller')
  , router = require('express').Router();

router.get('/verify', controller.verify);
router.get('/resend_verification',
           controller.middlewares.resend_verification,
           controller.resend_verification)
router.get('/get-premium',
           controller.middlewares.use_unlock_code,
           controller.use_unlock_code)
router.get('/unsubscribe', controller.unsubscribe)
router.post('/', controller.create);


module.exports = router;
