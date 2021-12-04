const DonHang = require('../../models/DonHang')


const {mutipleMongooseToObject} = require('../../../util/mongoose')
const {mongooseToObject} = require('../../../util/mongoose')

class DonHangController {
    
    index(req, res,next){
        DonHang.find({}).populate('maKhachHang')
        .then((donhang) => {
            res.render('staff/donhangs/dsDonHang',{
                donhang: mutipleMongooseToObject(donhang),
                layout: 'admin'
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
     
    chiTietDH(req, res, next){
        DonHang.findOne({_id: req.params.id})
        .then((donhang) => {
            res.render('staff/donhangs/chiTietDonHang', {
                donhang: mongooseToObject(donhang),
                layout: 'admin'
            })
        })
    }

    xacNhanDH(req, res, next){
        console.log(req.staff)
        console.log('vào xác nhận')
    }
}

module.exports= new DonHangController