const newsRouter = require('./news')
const adminRouter = require('./admin/admin')
const userRouter = require('./user/user')
const authRouter = require('./auth')
const {checkUser} = require('../../src/app/middlewares/authMiddleware')
function router(app){
    //app.use('*', checkUser)
    app.use('/admin', adminRouter)
    app.use('/', authRouter)
    app.use('/', userRouter)


}
module.exports = router;
