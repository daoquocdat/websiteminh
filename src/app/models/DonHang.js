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
    maChiTietDonHang: {
        type: Schema.Types.ObjectId,
        ref: 'ChiTietDonHang',
    },
    maDiaChi: {
        type: Schema.Types.ObjectId,
        ref: 'DiaChi',
    },
    trangThai:{
        type: String,
        default: 'Chưa xác thực'
    },
    trangThaiThanhToan: {
        type: String,
        default: 'Chưa thanh toán'
    },
    lyDo: {
        type: String,
    },

    tongTienHang: {
        type: Number,
        default: 0
    },
    phiGiaoHang: {
        type: Number,
        default: 0
    },
    tongTien: {
        type: Number,
        default: 0
    },
    ngayDat: { 
        type: Date, 
        default: Date.now
    },
    
})

module.exports = mongoose.model('DonHang',DonHang)