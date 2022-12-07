
const userRouter = require('./user')
const eventRouter = require('./event')
const fcmRouter = require('./fcm')
const notificationRouter = require('./notification')
const cors = require('cors')
function route(app) {
    app.use('/api/user', userRouter); // read db
    app.use('/api/event', eventRouter)
    app.use('/api/fcm', fcmRouter)
    app.use('/api/notification', notificationRouter)
}


module.exports = route;