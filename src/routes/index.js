
const userRouter = require('./user')

function route(app) {
    app.use('/api/user', userRouter); // read db
    
    
}


module.exports = route;