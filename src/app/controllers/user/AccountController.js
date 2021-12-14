const KhachHang = require('../../models/KhachHang')
const DonHang = require('../../models/DonHang')
const DiaChi = require('../../models/DiaChi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {mutipleMongooseToObject} = require('../../../util/mongoose')

class AccountController {
    diaChi(req, res, next){
        DiaChi.find({maKhachHang: req.user._id})
        .then((diachi) => {
            res.render('user/account/diaChi',{
                diachi: mutipleMongooseToObject(diachi)
            })
        })
    }
    themDiaChi(req, res, next){
        res.render('user/account/formThemDiaChi')
    }
    themDiaChiPost(req, res, next){
        console.log(req.body)
        const diachi = new DiaChi({
            maKhachHang: req.user._id,
            soNha: req.body.soNha,
            phuongXa: req.body.phuongXa,
            quanHuyen: req.body.quanHuyen,
            tinhTP:req.body.tinhTP,
        })
        .save()
        .then((diachi) =>{
            console.log('lưu địa chỉ thành công')
            KhachHang.updateOne({_id: req.user._id},{
                $push: {
                    diaChi: diachi._id
                }
            })
            .then(() =>{
                console.log('update địa chỉ khách hàng thành công')
                res.json({message: 'thêm địa chỉ thành công'})
            })
            .catch(() => {
                console.log('update địa chỉ khách hàng thất bại')
            })
        })
        .catch((err)=>{
            console.log('lưu địa chỉ thất bại')
        })
    }
    xoaDiaChi(req, res, next){
        DiaChi.deleteOne({_id: req.params.id})
        .then(() =>{
            console.log('xóa địa chỉ thành công')
            res.json({message: 'xoa dia chi thanh cong'})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    lichSuMuaHang(req, res, next){
        DonHang.find({maKhachHang: req.user._id}).populate('maChiTietDonHang')
        .then((dsdh) => {
            res.render('user/account/lichSuMuaHang',{
                dsdh: mutipleMongooseToObject(dsdh)
            })
        })
    }
    thongTinKhachHang(req, res, next){
        res.render('user/account/thongTin')
    }
    thongTinKhachHangPut(req, res, next){
        console.log(req.user)
        if(req.file){
            KhachHang.updateOne({_id: req.user._id},{
                hinhAnh: req.file.filename,
                hoTen: req.body.name,
                gioTinh: req.body.gender,
            })
            .then(() => {
                console.log('update khach hang thanh cong')
                res.json({message: 'update thong tin khach hang thanh cong'})
            })
            .catch((err) => {
                console.log('loi update thong tin khach hang', err)
            })
        }
    }
}
module.exports= new AccountController