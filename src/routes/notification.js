const express = require('express');
const router = express.Router();

const notificationController = require('../app/controllers/NotificationController')

//newsController.index

//search for person by id
router.post('/update/token', notificationController.updateDeviceToken)
router.get('/searchs', notificationController.searchs)

module.exports = router;
