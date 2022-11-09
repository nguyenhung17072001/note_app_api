
const userRouter = require('./user')
const eventRouter = require('./event')

function route(app) {
    app.use('/api/user', userRouter); // read db
    app.use('/api/event', eventRouter)
    
    
}


module.exports = route;