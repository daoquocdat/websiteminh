const DonHang = require('../../models/DonHang')
const SanPham = require('../../models/SanPham')
const ChiTietDonHang = require('../../models/ChiTietDonHang')


const {mutipleMongooseToObject} = require('../../../util/mongoose')
const {mongooseToObject} = require('../../../util/mongoose')

class DonHangController {
    
    index(req, res,next){
        DonHang.find({$or: [{
            trangThai: 'Đã xác thực'
        },
        {
            trangThai: 'Chưa xác thực'
        },
        
    ]
    }).populate('maKhachHang')
        .then((donhang) => {
            res.render('staff/donhangs/dsDonHang',{
                donhang: mutipleMongooseToObject(donhang),
                layout: 'staff'
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    dsdh(req, res, next){
        DonHang.find({$or: [{
            trangThai: 'Đã xác thực'
        },
        {
            trangThai: 'Chưa xác thực'
        },
        
    ]
    }).populate([{
            path: 'maKhachHang',
           },{
            path: 'maDanhGia',
           }])
        .then((donhang) => {
            res.render('staff/donhangs/dsDonHang',{
                donhang: mutipleMongooseToObject(donhang),
                layout: 'staff'
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    chiTietDH(req, res, next){
        DonHang.findOne({_id: req.params.id}).populate([{
            path: 'maDiaChi',
           },{
            path: 'maChiTietDonHang',
            populate:{
                path: 'sp.idSP',
                model: 'SanPham'
            }
           }])
        .then((donhang) => {
            res.render('staff/donhangs/chiTietDonHang', {
                donhang: mongooseToObject(donhang),
                layout: 'staff'
            })
        })
    }

    xacNhanDH(req, res, next){      
        console.log('vào xác nhận')
        DonHang.updateOne({
            _id: req.params.id
        }, {
            trangThai: 'Đã xác thực'
        })
        .then(() => {
           console.log('thành công') 
           res.json({message: 'xác nhận đơn hàng thành công'})
        })
        .catch(err => {
            console.log(err)
        })
    }

    huyDH(req, res, next){
        console.log(req.params.id, req.body.lydo)
        DonHang.updateOne({
            _id: req.params.id
        }, {
            trangThai: 'Hủy',
            lyDo: req.body.lydo
        })
        .then(() => {
           console.log('hủy thành công') 
           res.json({message: 'chuyển trạng thái thành hủy thành công'})
        })
        .catch(err => {
            console.log(err)
        })
    }

    hoanTatDH(req, res,next){
        DonHang.updateOne({
            _id: req.params.id
        }, {
            trangThai: 'Hoàn tất'
        })
        .then(() => {
           ChiTietDonHang.findOne({maDonHang: req.params.id})
           .then((ctdh) =>{
                SanPham.find({})
                .then((sp) =>{
                    sp.forEach((el) => {
                        ctdh.sp.forEach((el1) =>{
                            if(String(el._id) == String(el1.idSP)){
                                el.soLuong -= 1
                                el.save()
                            }
                        })
                    })
                    
                    
                })
                
           })
           .catch((err) => {
               console.log('tim ctdh trong hoan tat dh',err)
           })
           res.json({message: 'chuyển trạng thái thành hoàn tất thành công'})
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports= new DonHangController