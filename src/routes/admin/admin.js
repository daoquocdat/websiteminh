const express = require('express')
const router = express.Router()
const upload = require('../../../src/app/middlewares/multer')
const sanPhamController = require('../../app/controllers/admin/SanPhamAdminController')
const khachHangController = require('../../app/controllers/admin/KhachHangAdminController')
const hangSanXuatController = require('../../app/controllers/admin/HangSanXuatController')
const authController = require('../../app/controllers/admin/AuthController')
const nhanVienController = require('../../app/controllers/admin/NhanVienController')
const hoaDonController = require('../../app/controllers/admin/HoaDonController')
const donHangController = require('../../app/controllers/admin/DonHangController')
const {requireAuthAdmin} = require('../../../src/app/middlewares/authMiddleware')
//Đăng nhập đăng xuất
router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)
router.get('/logout', authController.logout_get)
///sản phẩm
router.get('/sanpham/formThemSP',requireAuthAdmin, sanPhamController.themSanPham)
router.post('/sanpham/themSP',requireAuthAdmin,upload.single('hinhAnh'), sanPhamController.themSanPhamPost)
router.get('/sanpham/dsSP',requireAuthAdmin, sanPhamController.dsSanPham)
router.delete('/sanpham/:id/xoaSP',requireAuthAdmin, sanPhamController.xoaSanPham)
router.get('/sanpham/trashSP',requireAuthAdmin, sanPhamController.thungRacSanPham)
router.patch('/sanpham/:id/trashSP/khoiPhuc',requireAuthAdmin, sanPhamController.khoiPhucThungRacSP)
router.delete('/sanpham/:id/trashSP/xoaVinhVien',requireAuthAdmin, sanPhamController.xoaVinhVienSP)
router.get('/sanpham/:id/formSuaSP',requireAuthAdmin, sanPhamController.suaSanPham)
router.put('/sanpham/:id/suaSP',requireAuthAdmin,upload.single('hinhAnh'), sanPhamController.suaSanPhamPut)

//Hãng sản xuất
router.get('/hangsx/formThemHSX',requireAuthAdmin, hangSanXuatController.themHangSanXuat)
router.post('/hangsx/themHSX',requireAuthAdmin,upload.single('hinhAnh'), hangSanXuatController.themHangSanXuatPost)
router.get('/hangsx/trashHSX',requireAuthAdmin, hangSanXuatController.thungRacHangSanXuat)
router.patch('/hangsx/:id/trashHSX/khoiPhuc',requireAuthAdmin, hangSanXuatController.khoiPhucThungRacHSX)
router.get('/hangsx/dsHSX',requireAuthAdmin, hangSanXuatController.dsHangSanXuat)
router.delete('/hangsx/:id/xoaHSX',requireAuthAdmin, hangSanXuatController.xoaHangSanXuat)
router.delete('/hangsx/:id/trashHSX/xoaVinhVien',requireAuthAdmin, hangSanXuatController.xoaVinhVienHSX)
router.get('/hangsx/:id/formSuaHSX',requireAuthAdmin, hangSanXuatController.suaHangSanXuat)
router.put('/hangsx/:id/suaHSX',requireAuthAdmin,upload.single('hinhAnh'), hangSanXuatController.suaHangSanXuatPut)
//Khách hàng
router.get('/khachhang/dskh',requireAuthAdmin, khachHangController.dsKhachHang)
router.post('/khachhang/:id/khoaKH',requireAuthAdmin, khachHangController.khoaKhachHang)

//nhân viên
router.get('/nhanvien/dangKy',requireAuthAdmin, nhanVienController.dangKyNV)
router.post('/nhanvien/dangKy',requireAuthAdmin, nhanVienController.dangKyNVPost)
router.get('/nhanvien/dsnv',requireAuthAdmin, nhanVienController.dsnv)
router.get('/nhanvien/:id/formSua',requireAuthAdmin, nhanVienController.formSua)
router.put('/nhanvien/:id/sua',requireAuthAdmin, nhanVienController.sua)
router.post('/nhanvien/:id/khoaNV',requireAuthAdmin, nhanVienController.khoaNV)
//hóa đơn
router.get('/hoadon/dshd',requireAuthAdmin, hoaDonController.dshd)
router.get('/hoadon/:id/chiTietHoaDon',requireAuthAdmin, hoaDonController.chiTietHoaDon)
//Đơn hàng
router.get('/donhang/:id/chiTietDH',requireAuthAdmin, donHangController.chiTietDH)
router.get('/donhang/dsdh',requireAuthAdmin, donHangController.dsdh)
router.post('/donhang/:id/xacNhan',requireAuthAdmin, donHangController.xacNhanDH)
router.post('/donhang/:id/huy',requireAuthAdmin, donHangController.huyDH)
router.post('/donhang/:id/hoanTat',requireAuthAdmin, donHangController.hoanTatDH)
//index
router.get('/',requireAuthAdmin, sanPhamController.index)
module.exports = router