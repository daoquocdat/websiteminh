
const DonHang = require('../../../../src/app/models/DonHang')

const {mutipleMongooseToObject} = require('../../../../src/util/mongoose')
const {mongooseToObject} = require('../../../../src/util/mongoose')
class HoaDonController {
   dshd(req, res, next){
        DonHang.find({$or: [{
            trangThai: 'Hủy'
        },
        {
            trangThai: 'Hoàn tất'
        },
        
    ]
        }).populate(['maDanhGia','maKhachHang'])
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
   chiTietHoaDon(req, res, next){
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
            console.log('donhang',donhang)
            res.render('admin/hoadons/chiTietHoaDon', {
                donhang: mongooseToObject(donhang),
                layout: 'admin'
            })
        })
    }
}

module.exports= new HoaDonController