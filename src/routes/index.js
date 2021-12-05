
const adminRouter = require('./admin/admin')
const staffRouter = require('./admin/staff')
const userRouter = require('./user/user')

const {checkUser} = require('../../src/app/middlewares/authMiddleware')
const {staffInfo} = require('../../src/app/middlewares/authMiddleware')
function router(app){
    app.use('/admin', adminRouter)
    app.use('/staff', staffRouter)
    app.use('/', userRouter)
}
module.exports = router;
