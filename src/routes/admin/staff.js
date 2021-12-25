const express = require('express')
const router = express.Router()
const donHangController = require('../../../src/app/controllers/staff/DonHangController')
const authController = require('../../../src/app/controllers/staff/authController')

const {checkStaff} = require('../../app/middlewares/authMiddleware')
const {requireAuthStaff} = require('../../app/middlewares/authMiddleware')
//Đăng nhập đăng xuất
router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)
router.get('/logout', authController.logout_get)

//Đơn hàng
router.get('/donhang/:id/chiTietDH',requireAuthStaff,checkStaff, donHangController.chiTietDH)
router.get('/donhang/dsdh',requireAuthStaff,checkStaff, donHangController.dsdh)
router.post('/donhang/:id/xacNhan',requireAuthStaff,checkStaff, donHangController.xacNhanDH)
router.post('/donhang/:id/huy',requireAuthStaff,checkStaff, donHangController.huyDH)
router.post('/donhang/:id/hoanTat',requireAuthStaff,checkStaff, donHangController.hoanTatDH)
router.get('/',requireAuthStaff,checkStaff, donHangController.index)

module.exports = router