const DanhGia = require('../../../../src/app/models/DanhGia')
const DonHang = require('../../../../src/app/models/DonHang')
const mongoose = require('mongoose')
const {mutipleMongooseToObject} = require('../../../../src/util/mongoose')
class DanhGiaController {
    danhGia(req, res, next){
        console.log(req.body)
        const idDonHang = mongoose.Types.ObjectId(req.body.id);
        console.log(idDonHang)
        const danhGia = new DanhGia({
            noiDung: req.body.text,
            maDonHang: idDonHang,
            maKhachHang: req.user._id
        }).save()
        .then((danhGia) =>{
            
            DonHang.updateOne({
                _id: idDonHang
            },{
                maDanhGia: danhGia._id
            })
            .then(() => {
                console.log('thành công')
                res.redirect('/lichSuMuaHang')
            })
            .catch((err) => {
                console.log('thất bại, ',err)
            })
        })
   }
}

module.exports= new DanhGiaController