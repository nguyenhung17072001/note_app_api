const express = require('express');
const router = express.Router();

const notificationController = require('../app/controllers/NotificationController')

//newsController.index

//search for person by id
router.post('/update/token', notificationController.updateDeviceToken)


module.exports = router;
