const express = require('express')
const router = express.Router()
const upload = require('../../../src/app/middlewares/multer')
const sanPhamController = require('../../app/controllers/admin/SanPhamAdminController')
const khachHangController = require('../../app/controllers/admin/KhachHangAdminController')
const hangSanXuatController = require('../../app/controllers/admin/HangSanXuatController')
const authController = require('../../app/controllers/admin/AuthController')
const nhanVienController = require('../../app/controllers/admin/NhanVienController')
const hoaDonController = require('../../app/controllers/admin/HoaDonController')

//Đăng nhập đăng xuất
router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)
router.get('/logout', authController.logout_get)
///sản phẩm
router.get('/sanpham/formThemSP', sanPhamController.themSanPham)
router.post('/sanpham/themSP',upload.single('hinhAnh'), sanPhamController.themSanPhamPost)
router.get('/sanpham/dsSP', sanPhamController.dsSanPham)
router.delete('/sanpham/:id/xoaSP', sanPhamController.xoaSanPham)
router.get('/sanpham/trashSP', sanPhamController.thungRacSanPham)
router.patch('/sanpham/:id/trashSP/khoiPhuc', sanPhamController.khoiPhucThungRacSP)
router.delete('/sanpham/:id/trashSP/xoaVinhVien', sanPhamController.xoaVinhVienSP)
router.get('/sanpham/:id/formSuaSP', sanPhamController.suaSanPham)
router.put('/sanpham/:id/suaSP',upload.single('hinhAnh'), sanPhamController.suaSanPhamPut)

//Hãng sản xuất
router.get('/hangsx/formThemHSX', hangSanXuatController.themHangSanXuat)
router.post('/hangsx/themHSX',upload.single('hinhAnh'), hangSanXuatController.themHangSanXuatPost)
router.get('/hangsx/trashHSX', hangSanXuatController.thungRacHangSanXuat)
router.patch('/hangsx/:id/trashHSX/khoiPhuc', hangSanXuatController.khoiPhucThungRacHSX)
router.get('/hangsx/dsHSX', hangSanXuatController.dsHangSanXuat)
router.delete('/hangsx/:id/xoaHSX', hangSanXuatController.xoaHangSanXuat)
router.delete('/hangsx/:id/trashHSX/xoaVinhVien', hangSanXuatController.xoaVinhVienHSX)
router.get('/hangsx/:id/formSuaHSX', hangSanXuatController.suaHangSanXuat)
router.put('/hangsx/:id/suaHSX',upload.single('hinhAnh'), hangSanXuatController.suaHangSanXuatPut)
//Khách hàng
router.get('/khachhang/dskh', khachHangController.dsKhachHang)
router.post('/khachhang/:id/khoaKH', khachHangController.khoaKhachHang)

//nhân viên
router.get('/nhanvien/dangKy', nhanVienController.dangKyNV)
router.post('/nhanvien/dangKy', nhanVienController.dangKyNVPost)
router.get('/nhanvien/dsnv', nhanVienController.dsnv)
router.get('/nhanvien/:id/formSua', nhanVienController.formSua)
router.put('/nhanvien/:id/sua', nhanVienController.sua)
router.post('/nhanvien/:id/khoaNV', nhanVienController.khoaNV)
//hóa đơn
router.get('/hoadon/dshd', hoaDonController.dshd)
router.get('/hoadon/:id/chiTietHoaDon', hoaDonController.chiTietHoaDon)
//index
router.get('/', sanPhamController.index)
module.exports = router