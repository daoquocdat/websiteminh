
const DonHang = require('../../../../src/app/models/DonHang')

const {mutipleMongooseToObject} = require('../../../../src/util/mongoose')
class HoaDonController {
   dshd(req, res, next){
        DonHang.find({trangThai: 'Hoàn tất'}).populate(['maDanhGia','maKhachHang'])
        .then((dshd) =>{
            res.render('admin/hoadons/dshd',{
                dshd: mutipleMongooseToObject(dshd),
                layout: 'admin'
            })
        })
        .catch((err) =>{
            console.log('lỗi dshd', err)
        })
   }
}

module.exports= new HoaDonController