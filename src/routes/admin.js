const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController')

//newsController.index

//search for person by id
router.get('/', adminController.login);
router.post('/login/action', adminController.loginAction);
router.get('/home', adminController.showHome);
router.get('/upload/:id', adminController.upload)


//login
//home
//chi tiet
//them



module.exports = router;
