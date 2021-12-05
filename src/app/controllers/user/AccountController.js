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
}
module.exports= new AccountController