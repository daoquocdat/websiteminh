const SanPham = require('../../models/SanPham')
const HangSanXuat = require('../../models/HangSanXuat')
const {mutipleMongooseToObject} = require('../../../util/mongoose')
const {mongooseToObject} = require('../../../util/mongoose')
const mongoose = require('mongoose')
class SanPhamAdminController {

    //[GET] /dssp/:slug
    index(req, res, next){
        SanPham.find({})      
        .then(dssp => {
            res.render('admin/sanphams/dssp',{
                dssp: mutipleMongooseToObject(dssp),
                layout: 'admin'
            })
        })
        .catch(next)
    }

    thungRacSanPham(req, res, next){
        SanPham.findDeleted({})
        .then(dssp => {
            res.render('admin/sanphams/thungRac',{
                dssp: mutipleMongooseToObject(dssp),
                layout: 'admin'
            })
        })
        .catch(next)
    }

    khoiPhucThungRacSP(req, res, next){
        SanPham.restore({_id: req.params.id})
        .then(() => {
            res.redirect('back')
        })
        .catch(next)
    }

    xoaVinhVienSP(req, res, next){
        SanPham.deleteOne({_id: req.params.id})
        .then(() => {
            console.log('xóa sp thành công')
            res.redirect('/admin/sanpham/trashSP')
            res.json({ message: 'xoa sp thanh cong'  })
        })
        .catch(() => {
            console.log('xóa sp thất bại')
            res.json({ status: 'error', error: 'xoa sp that bai' })
        })
    }

    themSanPham(req, res, next){
        HangSanXuat.find({})
        .then((dshsx) =>{
            res.render('admin/sanphams/formThem', {
                dshsx: mutipleMongooseToObject(dshsx),
                layout: 'admin'
            })
        })
    }

    themSanPhamPost(req, res, next){
        const sp = new SanPham({
            tenSanPham: req.body.tenSanPham,
            moTa: req.body.moTa,
            gia: req.body.gia,
            kichThuoc: req.body.kichThuoc,
            soLuong: req.body.soLuong,
            maHang: req.body.maHang,
            hinhAnh: req.file.filename,
        })
        .save()
        .then((sp) => {
            console.log('thêm sp thành công')
            var id = mongoose.Types.ObjectId(req.body.maHang);
            HangSanXuat.updateOne({_id: id},{
                $push: {
                    danhSachSanPham: id
                }
            })
            .then(() => {
                console.log('thành công update hãng sản xuất')
                res.json({ message: 'them sp thanh cong' })
            })
            .catch((err) => {
                console.log('update thất bại hsx')
            })
            
        })
        .catch((err) =>{
            console.log('thêm sp thất bại')
            console.log(err)
            res.json({error: 'them sp that bai'})
        })
    }

    dsSanPham(req, res, next){
        SanPham.find({})
            .then(dssp => {
                res.render('admin/sanphams/dssp',{
                    dssp: mutipleMongooseToObject(dssp),
                    layout: 'admin'
                })
            })
            .catch(next)
    }

    xoaSanPham(req, res, next){
        SanPham.delete({_id: req.params.id})
        .then(() => {
            console.log('xóa sp thành công')
            res.json({ message: 'xoa sp thanh cong'  })
        })
        .catch(() => {
            console.log('xóa sp thất bại')
            res.json({ status: 'error', error: 'xoa sp that bai' })
        })
    }
    suaSanPham(req, res, next){
        
        Promise.all([
            SanPham.findOne({_id: req.params.id}).populate('maHang'),
            HangSanXuat.find({})
        ])
        .then(([sp, dshsx]) => {
            return res.render('admin/sanphams/formSua', {
                sp: mongooseToObject(sp),
                dshsx: mutipleMongooseToObject(dshsx),
                layout: 'admin'
            })
        })
        .catch(next)
    }
    suaSanPhamPut(req, res, next){
        console.log(req.file)
        console.log(req.body)
        if(req.file){
            SanPham.updateOne({_id: req.params.id}, {
                tenSanPham: req.body.tenSanPham,
                soLuong:req.body.soLuong,
                moTa:req.body.moTa,
                kichThuoc:req.body.kichThuoc,
                maHang:req.body.maHang,
                gia:req.body.gia,
                hinhAnh:req.file.filename,
            })
            .then(() => {
                console.log('sua thong tin sp thanh cong')
                res.json({message: 'sua thong tin sp thanh cong'})

            })
            .catch(() => {
                res.json({
                    status: 'error',
                    error: 'sua thong tin sp that bai'
                })
            })
        }
        else{
            SanPham.updateOne({_id: req.params.id}, {
                tenSanPham: req.body.tenSanPham,
                soLuong:req.body.soLuong,
                moTa:req.body.moTa,
                kichThuoc:req.body.kichThuoc,
                gia:req.body.gia,
                maHang:req.body.maHang,
            })
            .then(() => {
                console.log('sua thong tin sp thanh cong')
                res.redirect('/admin/sanpham/dssp')
                //res.json({message: 'sua thong tin sp thanh cong'})
            })
            .catch(() => {
                // res.json({
                //     status: 'error',
                //     error: 'sua thong tin sp that bai'
                // })
                res.redirect('/admin/sanpham/dssp')
            })
        }
    }
}

module.exports= new SanPhamAdminController