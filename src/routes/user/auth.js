const express = require('express')
const router = express.Router()

const authController = require('../../app/controllers/user/AuthController')
const {requireAuth} = require('../../app/middlewares/authMiddleware')
const {checkUser} = require('../../app/middlewares/authMiddleware')

router.get('/register', authController.registerGet)
router.post('/register', authController.registerPost)
router.get('/login', authController.loginGet)
router.post('/login',checkUser, authController.loginPost)
router.get('/logout', authController.logout_get)


module.exports = router