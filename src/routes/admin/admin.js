const express = require('express')
const router = express.Router()
const upload = require('../../../src/app/middlewares/multer')
const sanPhamController = require('../../app/controllers/admin/SanPhamAdminController')
const khachHangController = require('../../app/controllers/admin/KhachHangAdminController')
const hangSanXuatController = require('../../app/controllers/admin/HangSanXuatController')

router.get('/sanpham/formThemSP', sanPhamController.themSanPham)
router.post('/sanpham/themSP',upload.single('hinhAnh'), sanPhamController.themSanPhamPost)
router.get('/sanpham/dsSP', sanPhamController.dsSanPham)
router.delete('/sanpham/:id/xoaSP', sanPhamController.xoaSanPham)
router.get('/sanpham/:id/formSuaSP', sanPhamController.suaSanPham)
router.put('/sanpham/:id/suaSP',upload.single('hinhAnh'), sanPhamController.suaSanPhamPut)

//Hãng sản xuất
router.get('/hangsx/formThemHSX', hangSanXuatController.themHangSanXuat)
router.post('/hangsx/themHSX', hangSanXuatController.themHangSanXuatPost)
router.get('/hangsx/dsHSX', hangSanXuatController.dsHangSanXuat)
router.delete('/hangsx/:id/xoaHSX', hangSanXuatController.xoaHangSanXuat)
router.get('/hangsx/:id/formSuaHSX', hangSanXuatController.suaHangSanXuat)
router.put('/hangsx/:id/suaHSX', hangSanXuatController.suaHangSanXuatPut)
//Khách hàng
router.get('/khachhang/dskh', khachHangController.dsKhachHang)
router.post('/khachhang/:id/khoaKH', khachHangController.khoaKhachHang)

router.get('/', sanPhamController.index)
module.exports = router