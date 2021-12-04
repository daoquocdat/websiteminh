const express = require('express')
const router = express.Router()
const donHangController = require('../../../src/app/controllers/staff/DonHangController')
const authController = require('../../../src/app/controllers/staff/authController')

const {staffInfo} = require('../../app/middlewares/authMiddleware')
//Đăng nhập đăng xuất
router.get('/login',staffInfo, authController.loginGet)
router.post('/login',staffInfo, authController.loginPost)
router.get('/logout', authController.logout_get)

//Đơn hàng
router.get('/donhang/:id/chiTietDH', donHangController.chiTietDH)
router.post('/donhang/:id/xacNhan', donHangController.xacNhanDH)
router.get('/', donHangController.index)

module.exports = router