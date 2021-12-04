const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DiaChi = new Schema({
    maKhachHang: {
        type: Schema.Types.ObjectId,
        ref: 'KhachHang'
    },
    soNha: {
        type: String,
        require: true
    },
    phuongXa: {
        type: String,
        require: true
    },
    quanHuyen: {
        type: String,
        require: true
    },
    tinhTP: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('DiaChi',DiaChi)