const HangSanXuat = require('../../../../src/app/models/HangSanXuat')
const {mutipleMongooseToObject} = require('../../../util/mongoose')
const {mongooseToObject} = require('../../../util/mongoose')
const mongoose = require('mongoose')
class HangSanXuatController {
    dsHangSanXuat(req, res, next){
        HangSanXuat.find({})
            .then(dshsx => {
                res.render('admin/hangsanxuats/dshsx',{
                    dshsx: mutipleMongooseToObject(dshsx),
                    layout: 'admin'
                })
            })
            .catch(next)
    }
    thungRacHangSanXuat(req, res, next){
        HangSanXuat.findDeleted({})
        .then(dshsx => {
            res.render('admin/hangsanxuats/thungRac',{
                dshsx: mutipleMongooseToObject(dshsx),
                layout: 'admin'
            })
        })
        .catch(next)
    }

    khoiPhucThungRacHSX(req, res, next){
        HangSanXuat.restore({_id: req.params.id})
        .then(() => {
            res.redirect('back')
        })
        .catch(next)
    }

    xoaVinhVienHSX(req, res, next){
        HangSanXuat.deleteOne({_id: req.params.id})
        .then(() => {
            console.log('xóa hsx thành công')
            res.redirect('/back')
            res.json({ message: 'xoa hsx thanh cong'  })
        })
        .catch(() => {
            console.log('xóa hsx thất bại')
            res.json({ status: 'error', error: 'xoa hsx that bai' })
        })
    }
    themHangSanXuat(req, res, next){
        res.render('admin/hangsanxuats/formThem',{
            layout: 'admin'
        })
    }

    themHangSanXuatPost(req, res, next){
        console.log("req.body",req.body)
        console.log("req.file",req.file)
        const hangSX = new HangSanXuat({
            tenHangSanXuat: req.body.tenHangSanXuat,
            hinhAnh: req.file.filename,
            danhSachSanPham: []
        })
        .save()
        .then((hangSX) => {
            console.log('thêm hãng sx thành công')
            res.json({ message: 'them hsx thanh cong' })
        })
        .catch(() =>{
            console.log('thêm hãng sx thất bại')
            res.json({error: 'them hsx that bai'})
        })
    }

    xoaHangSanXuat(req, res, next){
        console.log(req.params.id)
        HangSanXuat.findOne({_id: req.params.id})
        .then((hsx) => {
            
            if(hsx.danhSachSanPham.length > 0){
                console.log('HSX co sp ko the xoa')
                res.json({ message: 'HSX co sp ko the xoa'  })
            }
            else{
                HangSanXuat.delete({_id: req.params.id})
                .then(() => {
                    console.log('xóa hsx thành công')
                    res.json({ message: 'xoa hsx thanh cong'  })
                })
                .catch(() => {
                    console.log('xóa hsx thất bại')
                    res.json({ status: 'error', error: 'xoa hsx that bai' })
                })
            }
        })
        
    }

    suaHangSanXuat(req, res, next){
        HangSanXuat.findOne({_id: req.params.id})
        .then((hsx) => {
            return res.render('admin/hangsanxuats/formSua', {
                hsx: mongooseToObject(hsx),
                layout: 'admin'
            })
        })
        .catch(next)
        
    }

    suaHangSanXuatPut(req,res, next){
        HangSanXuat.updateOne({_id: req.params.id}, {
            tenHangSanXuat: req.body.tenHangSanXuat
        })
        .then(() => {
            console.log('sua thong tin hsx thanh cong')
            res.json({message: 'sua thong tin hsx thanh cong'})
        })
        .catch(() => {
            res.json({
                status: 'error',
                error: 'sua thong tin hsx that bai'
            })
        })
    }

}

module.exports= new HangSanXuatController