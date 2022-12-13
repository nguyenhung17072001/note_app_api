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

class NotificationController {
    async updateDeviceToken(req, res, next) {
        User.findOne({
            _id: req.body.userId
        })
        .then((user)=> {
            if(user) {
                let token = new DeviceToken({
                    userId: req.body.userId,
                    token: req.body.token,
                })
                DeviceToken.findOne({
                    userId: req.body.userId,
                    token: req.body.token,
                }).then((device)=> {
                    if(device) {
                        return res.json({
                            message: "Thiết bị này đã tồn tại"
                        })
                    } else{
                        token.save();
                        return res.json({
                            ...success,
                            deviceToken: mongooseToObject(token),
                        });
                    }
                })
                
               
            } else if(!user) {
                res.json({
                    message: "Không tồn tại user",
                })
            }
        }).catch(next)
    }


    async searchs(req, res, next) {
        console.log('req.body: ', req.body)
        console.log('req.params: ', req.params)
        console.log('req.query: ', req.query)
        Notification.find({userId: req.body.userId})
        .then((notification)=>{
            if(notification) {
                //console.log(req.body.userId)
                res.json({
                    ...success,
                    data: notification,
                    total: notification.length
                })
                
            }
            else {
                return res.status(404).json({fail})
            }
        }).catch(next)
    }
  
}

module.exports = new NotificationController();
