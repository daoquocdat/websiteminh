const express = require('express')
const router = express.Router()

const khachHangController = require('../../app/controllers/user/KhachHangController')
const sanPhamController = require('../../app/controllers/user/SanPhamController')
const siteController = require('../../app/controllers/user/siteController')

router.get('/sanpham/dssp', sanPhamController.dssp)
router.get('/sanpham/show', sanPhamController.show)

module.exports = router