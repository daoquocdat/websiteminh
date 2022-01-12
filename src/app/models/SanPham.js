const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema;

const SanPham = new Schema({
    tenSanPham: { type: String},
    soLuong: {type: Number},
    hinhAnh: {type:String},
    moTa: { type: String},
    kichThuoc: {type: String},
    gia: { type: Number},
    maHang : {
        type: Schema.Types.ObjectId,
        ref: 'HangSanXuat',
    },
    SLDaBan: {
        type: Number,
    },
    slug: { 
        type: String, 
        slug: 'tenSanPham', 
    },
    ngayTao: { type: Date, default: Date.now},
})
mongoose.plugin(slug);
SanPham.plugin(mongooseDelete,{ 
    deleted_At: true,
    overrideMethods: 'all' ,
})
module.exports = mongoose.model('SanPham',SanPham)