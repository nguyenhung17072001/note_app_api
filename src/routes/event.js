const express = require('express');
const router = express.Router();

const eventController = require('../app/controllers/EventController')

//newsController.index

//search for person by id
router.get('/list/person', eventController.list)
router.post('/insert/position', eventController.insertPosition)


module.exports = router;
