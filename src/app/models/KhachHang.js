const mongoose = require('mongoose')
const SanPham = require('../models/SanPham')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const { isEmail } = require('validator')

const KhachHang = new Schema({
    hoTen: { type: String},
    phone: {
        type: String,
    },
    email: { 
        type: String, 
        require: [true, 'Vui lòng nhập email'], 
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Vui lòng nhập email hợp lệ']
    },
    matKhau: {
        type: String,
        require: [true, 'Vui lòng nhập mật khẩu'],
        
    },
    hinhAnh: {type:String},
    gioiTinh: {type: String},
    gioHang:{
        sp:[
            {
                idSanPham:{
                    type: Schema.Types.ObjectId,
                    ref: 'SanPham',
                },
                soLuong: {
                    type: Number,
                },
                mau: {
                    type: String,
                },
                ghiChu: {
                    type: String,
                },
            }
        ],
        tongTien: {
            type: Number
        }
    },
    trangThai: {
        type: String,
    },
    diaChi: {
        type: Schema.Types.ObjectId,
        ref: 'DiaChi' 
    },
    createdAt: { type: Date, default: Date.now},
})
//hàm kiểm tra đăng nhập
KhachHang.statics.login = async function(phone, password){
    const user = await this.findOne({ phone })
    if(user){
        const auth = await bcrypt.compare(password, user.matKhau)
        if(auth){
            if(user.trangThai == 'khóa'){
                console.log('tai khoan bi khoa!')
                return 'Tài khoản đã bị khóa!'
            }
            else{
                return user
            }
        }
        throw Error('Sai tài khoản hoặc mật khẩu')
    }
    throw Error('Sai tài khoản hoặc mật khẩu')
}
//Hàm thêm sản phẩm vào giỏ hàng
KhachHang.methods.addToCart = async function (idSPInput,soLuongInput, mauInput, ghiChuInput = ''){
    const sp = await SanPham.findById(idSPInput)
    if (sp) {
        var gioHang = this.gioHang
        if(gioHang.sp.length == 0 ){
            gioHang.sp.push({
                idSanPham: sp._id, 
                soLuong: soLuongInput, 
                mau: mauInput,
                ghiChu: ghiChuInput
            })
            gioHang.tongTien = sp.gia * soLuongInput
        }else{
            const isExisting = gioHang.sp.findIndex(objInItems => {
                return new String(objInItems.idSanPham).trim() == String(sp._id).trim()
            })
            if( isExisting >= 0 && gioHang.sp[isExisting].mau == mauInput){
                //console.log(gioHang.sp[isExisting].mau, mauInput)
                gioHang.sp[isExisting].soLuong += 1
            }
            else{
                gioHang.sp.push({
                    idSanPham: sp._id, 
                    soLuong: soLuongInput, 
                    mau: mauInput,
                    ghiChu: ghiChuInput
                })
            }
            if(!gioHang.tongTien){
                gioHang.tongTien = 0
            }
            gioHang.tongTien += sp.gia * soLuongInput
        }
        //console.log('User in schema ', this.gioHang)   
        return this.save()
    }
    
}
//Hàm xóa sp ra khỏi giỏ hàng
KhachHang.methods.removeInCart = async function (itemId){
    const gioHang = this.gioHang   
    const isExisting = gioHang.sp.findIndex(objInItems => {
        console.log(String(objInItems._id))
        return new String(objInItems._id).trim() == String(itemId).trim()
    })
    const sp = await SanPham.findById(gioHang.sp[isExisting].idSanPham)
    if(isExisting >= 0 ){
        gioHang.tongTien -= (sp.gia * gioHang.sp[isExisting].soLuong)
        gioHang.sp.splice(isExisting, 1)
        return this.save()
    }
}
module.exports = mongoose.model('KhachHang',KhachHang)