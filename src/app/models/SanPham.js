const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const SanPham = new Schema({
    tenSanPham: { type: String, minLength: 5},
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

module.exports = mongoose.model('SanPham',SanPham)