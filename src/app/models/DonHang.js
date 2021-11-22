const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DonHang = new Schema({
    maNhanVien: {
        type: Schema.Types.ObjectId,
        ref: 'NhanVien',
    },
    maKhachHang: {
        type: Schema.Types.ObjectId,
        ref: 'KhachHang',
    },
    maDiaChi: {
        type: Schema.Types.ObjectId,
        ref: 'DiaChi',
    },
    ngayDat: { 
        type: Date, 
        default: Date.now
    },
    
})

module.exports = mongoose.model('DonHang',DonHang)