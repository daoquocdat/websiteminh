const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DanhGia = new Schema({
    maKhachHang: {
        type: Schema.Types.ObjectId,
        ref: 'KhachHang'
    },
    noiDung: {
        type: String
    },
    maDonHang: {
        type: Schema.Types.ObjectId,
        ref: 'DonHang'
    }
})

module.exports = mongoose.model('DanhGia',DanhGia)