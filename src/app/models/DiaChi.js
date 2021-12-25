const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')
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
DiaChi.plugin(mongooseDelete,{ 
    deleted_At: true,
    overrideMethods: 'all' ,
})
module.exports = mongoose.model('DiaChi',DiaChi)