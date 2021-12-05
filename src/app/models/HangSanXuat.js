const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const HangSanXuat = new Schema({
    tenHangSanXuat: { type: String},
    hinhAnh: {type: String},
    danhSachSanPham: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SanPham'
        }
    ]
})
HangSanXuat.plugin(mongooseDelete,{ 
    deleted_At: true,
    overrideMethods: 'all' ,
})
module.exports = mongoose.model('HangSanXuat',HangSanXuat)