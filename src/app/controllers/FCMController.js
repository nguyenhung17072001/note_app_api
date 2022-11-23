'use strict';
const User = require("../models/User");
const FCM = require("fcm-node");

const { mutipleMongooseToObject, mongooseToObject} = require("../../util/mongoose");
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
            let message = {
                to: '/topics/'+ req.body.topic,
                notification: {
                    title: req.body.title,
                    body: req.body.body,
                    sound: 'default',
                    "click_action": "FCM_PLUGIN_ACTIVITY",
                    "icon": "fcm_push_icon"
                },
                data: req.body.data
                
            }

            fcm.send(message, (err, response)=> {
                if(err) {
                    next(err);
                }
                else {
                    res.json(response);
                }
            })
            
        }
        catch(err) {
            console.log('err push notification', err)
        }
    }
    
}

module.exports = new NewsControllers();
