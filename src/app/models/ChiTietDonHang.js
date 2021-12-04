const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChiTietDonHang = new Schema({
    maDonHang:{
        type: Schema.Types.ObjectId,
        ref: 'DonHang'
    },
    sp: [
            {
                idSP:{
                    type: Schema.Types.ObjectId,
                    ref: 'SanPham'
                },
                mau: {
                    type: String,
                },
                soLuong: {
                    type: Number,
                },
                ghiChu: {
                    type: String,
                }
            }
        ],
    tongTien: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('ChiTietDonHang',ChiTietDonHang)