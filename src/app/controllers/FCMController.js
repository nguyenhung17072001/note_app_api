'use strict';
const User = require("../models/User");
const FCM = require("fcm-node");

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

            let message = {
                to: 'fW3C8u4ITuqeOeqYC_ST_C:APA91bHE3VaEqcEEUCMnLzSYStQY3LSAIOFfMm9tiBu9jZBt_X060FsdLUbP-lNwKyuUxLXMDImKdXvmSRkoLeqORqjE7-TsIGsiDImWkmVmxerr6ND80hVnOyljNmtFTGRyTIbdEpS_',
                notification,
                data: req.body.data
                
            }

            
            fcm.send(message, (err, response)=> {
                if(err) {
                    next(err);
                }
                else {
                    //res.json(JSON.parse(response));
                    let resp={
                        ...notification,
                        ...JSON.parse(response) 
                    }
                    res.json(resp)
                    
                }
            })
            
        }
        catch(err) {
            console.log('err push notification', err)
        }
    }
    
}

module.exports = new NewsControllers();
