const express = require('express')
const router = express.Router()

const khachHangController = require('../../app/controllers/user/KhachHangController')
const sanPhamController = require('../../app/controllers/user/SanPhamController')
const searchController = require('../../app/controllers/user/SearchController')
const authController = require('../../app/controllers/user/AuthController')
const accountController = require('../../app/controllers/user/AccountController')
const hangsxController = require('../../app/controllers/user/HangSanXuatController')
const danhGiaController = require('../../app/controllers/user/DanhGiaController')
const homeController = require('../../app/controllers/user/HomeController')

const upload = require('../../../src/app/middlewares/multer')
const {checkUser} = require('../../app/middlewares/authMiddleware')
const {requireAuth} = require('../../../src/app/middlewares/authMiddleware')

//đăng nhập đăng ký

router.get('/register', authController.registerGet)
router.post('/register', authController.registerPost)
router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)
router.get('/logout', authController.logout_get)
//Sản phẩm controller
router.get('/sanpham/dssp',checkUser, sanPhamController.dssp)
router.get('/sanpham/:slug/chitietsp',checkUser, sanPhamController.chitietsp)
//Hãng sản xuât
router.get('/hangsx/dshsx',checkUser, hangsxController.dshsx)
router.get('/hangsx/:slug/chitiet',checkUser, hangsxController.chitiet)
//Khách hàng controller
router.post('/:id/themVaoGioHang',requireAuth,checkUser, khachHangController.themvaogiohang)
router.post('/:id/xoaKhoiGioHang',checkUser, khachHangController.xoaKhoiGioHang)
router.get('/xemGioHang',checkUser, khachHangController.xemGioHang)
router.post('/xemGioHang',checkUser, khachHangController.xemGioHangPost)
//tài khoản
router.get('/diaChi',checkUser, accountController.diaChi)
router.delete('/:id/xoaDiaChi',checkUser, accountController.xoaDiaChi)
router.get('/themDiaChi',checkUser, accountController.themDiaChi)
router.post('/themDiaChi',checkUser, accountController.themDiaChiPost)
router.get('/lichSuMuaHang',checkUser, accountController.lichSuMuaHang)
router.get('/thongTinKhachHang',checkUser, accountController.thongTinKhachHang)
router.post('/thongTinKhachHang',checkUser,upload.single('hinhAnh'), accountController.thongTinKhachHangPut)
//đánh giá sản phẩm
router.post('/danhGia',checkUser, danhGiaController.danhGia)
//Tìm kiếm
router.get('/search', searchController.search)
//đơn hàng
router.get('/diaChiGiaoHang',checkUser, khachHangController.diaChiGiaoHang)
router.post('/diaChiGiaoHang',checkUser, khachHangController.diaChiGiaoHangPost)
router.get('/phuongThucThanhToan',checkUser, khachHangController.phuongThucThanhToan)
router.post('/phuongThucThanhToan',checkUser, khachHangController.phuongThucThanhToanPost)
router.get('/kiemTraDonHang',checkUser, khachHangController.kiemTraDonHang)
router.post('/donhang/xacThuc',checkUser, khachHangController.xacThucDonHang)
router.get('/hoanTatDonHang',checkUser, khachHangController.hoanTatDonHang)
router.get('/',checkUser, homeController.index)

module.exports = router