'use strict';
const User = require("../models/User");
const DeviceToken = require("../models/DeviceToken")
const Notification = require("../models/Notification")

const { mutipleMongooseToObject, mongooseToObject} = require("../../util/mongoose");


const success = {
    status: 200,
    code: "SUCCESS",
    message: "Thành công",
};

const fail = {
    message: "Tài khoản không tồn tại",
};

class AdminController {
    login(req, res, next) {
        res.json({
            hung: 'hung',
        })
    }
  
}

module.exports = new AdminController();
