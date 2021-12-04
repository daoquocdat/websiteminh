const express = require('express')
const router = express.Router()

const khachHangController = require('../../app/controllers/user/KhachHangController')
const sanPhamController = require('../../app/controllers/user/SanPhamController')
const siteController = require('../../app/controllers/user/siteController')

const {checkUser} = require('../../../src/app/middlewares/authMiddleware')
//Sản phẩm controller
router.get('/sanpham/dssp', sanPhamController.dssp)
router.get('/sanpham/:slug/chitietsp', sanPhamController.chitietsp)
//Khách hàng controller
router.post('/:id/themVaoGioHang', khachHangController.themvaogiohang)
router.post('/:id/xoaKhoiGioHang', khachHangController.xoaKhoiGioHang)
router.get('/xemGioHang', khachHangController.xemGioHang)
router.post('/xemGioHang', khachHangController.xemGioHangPost)

router.get('/diaChiGiaoHang', khachHangController.diaChiGiaoHang)
router.post('/diaChiGiaoHang', khachHangController.diaChiGiaoHangPost)
router.get('/phuongThucThanhToan', khachHangController.phuongThucThanhToan)
router.post('/phuongThucThanhToan', khachHangController.phuongThucThanhToanPost)
router.get('/kiemTraDonHang', khachHangController.kiemTraDonHang)
router.post('/donhang/xacThuc', khachHangController.xacThucDonHang)
router.get('/hoanTatDonHang', khachHangController.hoanTatDonHang)
router.get('/',checkUser, sanPhamController.dssp)

module.exports = router