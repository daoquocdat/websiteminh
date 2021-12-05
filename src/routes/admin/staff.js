const express = require('express')
const router = express.Router()
const donHangController = require('../../../src/app/controllers/staff/DonHangController')
const authController = require('../../../src/app/controllers/staff/authController')

const {staffInfo} = require('../../app/middlewares/authMiddleware')
//Đăng nhập đăng xuất
router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)
router.get('/logout', authController.logout_get)

//Đơn hàng
router.get('/donhang/:id/chiTietDH', donHangController.chiTietDH)
router.get('/donhang/dsdh', donHangController.dsdh)
router.post('/donhang/:id/xacNhan', donHangController.xacNhanDH)
router.post('/donhang/:id/huy', donHangController.huyDH)
router.post('/donhang/:id/hoanTat', donHangController.hoanTatDH)
router.get('/', donHangController.index)

module.exports = router