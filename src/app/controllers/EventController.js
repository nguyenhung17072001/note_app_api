const Event = require('../models/Event')
const User = require('../models/User')
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

    // [Get] /event/list/person
    list(req, res, next) {
        //console.log('req.query: ', req.query)
        Event.find({userId: req.body.userId})
        .then((event)=> {
            res.json({
                ...success,
                data: event,
                total: event.length,

            })
            
        })
        .catch(next)
    }

    // [Post] api/event/insert/position
    insertPosition(req, res, next) {
        //res.send('Hung dzai')

        
        
        
        User.find({position: req.body.position})
        .then((user)=> {
            //res.json(user)
            user.forEach(u=> {
                let formData= {
                    ...req.body,
                    name: u.name,
                    userId: u._id
                }
                let event = new Event(formData)
                //
                Event.findOne(formData).then((ev)=> {
                    if(ev){
                        res.json({
                            message: "Lịch bị trùng"
                        })
                    } else{
                        event.save()
                        .then(()=> res.json(success))
                        
                    
                    }

                })
                
            })
            
        })
        .catch(next)

    }


}

module.exports = new EventControllers;

