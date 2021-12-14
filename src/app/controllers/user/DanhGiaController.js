const DanhGia = require('../../../../src/app/models/DanhGia')
const DonHang = require('../../../../src/app/models/DonHang')

const {mutipleMongooseToObject} = require('../../../../src/util/mongoose')
class DanhGiaController {
   danhGia(req, res, next){
       console.log(req.user._id)
       const danhgia = new DanhGia({
            maKhachHang: req.user._id,
            noiDung: req.body.danhGia,
            maDonHang: req.body.idDonHang,
       }).save()
       .then((danhgia)=> {
            console.log(danhgia)
            DonHang.updateOne({
                _id: danhgia.maDonHang
            },{
                maDanhGia: danhgia._id
            })
            .then(() => {
                console.log('gửi đánh giá thành công')
            })
            .catch((err) => {
                console.log('lỗi khi gửi đánh giá', err)
            })
       })
       .catch((err) => {
           console.log(err)
       })
   }
}

module.exports= new DanhGiaController