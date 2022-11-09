const Event = require('../models/Event')
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')


const success = {
    status: 200,
    code: "SUCCESS",
    message: "Thành công",
};
  
const fail = {
    message: "Tài khoản không tồn tại",
};

class EventControllers {
    // [Get] /event/list/person?id=
    list(req, res, next) {
        //console.log('req.query: ', req.query)
        Event.find({userId: req.query.userId})
        .then((event)=> {
            res.json({
                ...success,
                data: event,
                total: event.length,
            })
            
        })
        .catch(next)
    }



}

module.exports = new EventControllers;

