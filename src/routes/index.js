
const userRouter = require('./user');
const eventRouter = require('./event');
const fcmRouter = require('./fcm');
const notificationRouter = require('./notification');
const adminRouter = require('./admin')

const cors = require('cors')
function route(app) {
    app.use('/api/user', userRouter); // read db
    app.use('/api/event', eventRouter)
    app.use('/api/fcm', fcmRouter)
    app.use('/api/notification', notificationRouter)

    app.use('/admin', adminRouter)

    //login
    //home
    //chi tiet
    //them


}


module.exports = route;