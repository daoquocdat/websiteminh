const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const HangSanXuat = new Schema({
    tenHangSanXuat: { type: String},
    hinhAnh: {type: String},
    slug: { 
        type: String, 
        slug: 'tenHangSanXuat', 
    },
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