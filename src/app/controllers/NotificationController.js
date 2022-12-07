'use strict';
const User = require("../models/User");
const DeviceToken = require("../models/DeviceToken")

const { mutipleMongooseToObject, mongooseToObject} = require("../../util/mongoose");


const success = {
    status: 200,
    code: "SUCCESS",
    message: "Thành công",
};

const fail = {
    message: "Tài khoản không tồn tại",
};

class NotificationController {
    updateDeviceToken(req, res, next) {
        User.findOne({
            _id: req.body.userId
        })
        .then((user)=> {
            if(user) {
                let token = new DeviceToken({
                    userId: req.body.userId,
                    token: req.body.token,
                })
                token.save()
                res.json({
                    ...success,
                    deviceToken: mongooseToObject(token),
                });
            } else if(!user) {
                res.json({
                    message: "Không tồn tại user",
                })
            }
        }).catch(next)
    }
  
}

module.exports = new NotificationController();
