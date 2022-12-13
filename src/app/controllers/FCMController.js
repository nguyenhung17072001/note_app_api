'use strict';
const User = require("../models/User");
const FCM = require("fcm-node");
const DeviceToken = require('../models/DeviceToken');
const Notification = require("../models/Notification");
const { mutipleMongooseToObject, mongooseToObject} = require("../../util/mongoose");
const { json } = require("express");
const SERVER_KEY = "AAAAX_oOyes:APA91bGXtfGKFhOGQA7U_I2Pr_Da23b8iHs6DrHYOKh4XlgzITDP6FolRzj09hMxbASDve9at5drdBVtudrWL4M8J-y71FFxQixrTXUuAnjVK0SYZlAgQO_uJpexCku0YUXUQFGJagyh";

const success = {
  status: 200,
  code: "SUCCESS",
  message: "Thành công",
};

const fail = {
  message: "Tài khoản không tồn tại",
};

class NewsControllers {
    // [Post] api/fcm/notification/push
    async pushNotification(req, res, next) {
        
        try {
            let fcm = new FCM(SERVER_KEY);
            let notification= {
                title: req.body.title,
                body: req.body.body,
                sound: 'default',
                "click_action": "FCM_PLUGIN_ACTIVITY",
                "icon": "fcm_push_icon"
            }
            

            DeviceToken.find({
                userId: req.body.userId,
                
            }).then((devices)=> {
                const noti = new Notification({
                    userId: req.body.userId,
                    body: notification.body,
                    title: notification.title,
                });

                if(devices) {
                    devices.forEach((device)=> {
                        let message={
                            to: device.token,
                            notification,
                            data: req.body.data
                        }
                        //let mess = mutipleMongooseToObject(message)
                        //console.log(mess)
                        fcm.send(message, (err, response)=> {
                            if(err) {
                                //console.log('errr')
                                //next(err);
                                return res.status(500).json(err)
                            }
                            else {
                                //res.json(JSON.parse(response));
                                let resp={
                                    ...notification,
                                    ...JSON.parse(response) 
                                }
                                noti.save()
                                return res.json(resp)
                                
                            }
                        })

                    })
                    
                    
                } else{
                    res.json({fail})
                }
            })

            
            
        }
        catch(err) {
            console.log('err push notification', err)
            next(err)
        }
    }
    
}

module.exports = new NewsControllers();
