const express = require('express');
const router = express.Router();

const fcmController = require('../app/controllers/FCMController')

//newsController.index


router.post('/notification/push', fcmController.pushNotification)


module.exports = router;