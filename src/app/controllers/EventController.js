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
        //const formData = req.query
        //formData.userId = req.body.userId
        //req.body = req.query;
        console.log('req.body: ', req.body)
        console.log('req.params: ', req.params)
        console.log('req.query: ', req.query)
        
        Event.find({userId: req.body.userId  || req.query.userId})
        .then((event)=> {
            if(!event) {
                res.json({
                    message: "Không tìm thấy event nào"
                })
            }else {
                res.status(200).json({
                    ...success,
                    data: event.sort(function(a,b){
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return new Date(a.time) - new Date(b.time);
                      }),
                    total: event.length,
    
                })
            }
            
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
                Event.findOne({time: req.body.time}).then((ev)=> {
                    if(ev){
                        res.json({
                            message: "Lịch bị trùng"
                        })
                    } else{
                        event.save()
                        .then(()=> res.status(200).json(success))
                        
                    
                    }

                })
                
            })
            
        })
        .catch(next)

    }

    //[Post] /api/event/insert/person?userId
    insertPerson(req, res, next) {
        //res.send('anh hung dep zai')
        
        
        User.findOne({_id: req.query.userId})
        .then((user)=> {
            
            let formData= {
                ...req.body,
                name: user.name,
                userId: user._id,
                position: user.position
            }
            //console.log("formData: ", formData)
            
            let event = new Event(formData)
            
            Event.findOne({time: req.body.time})
            .then((ev)=> {
                if(ev) {
                    res.json({
                        message: "Thất bị vì bị trùng lịch"
                    })
                } else {
                    event.save()
                    res.status(200).json(success)
                }
            })
        })
        
    }


}

module.exports = new EventControllers;

