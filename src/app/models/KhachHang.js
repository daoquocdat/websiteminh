const mongoose = require('mongoose')
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
    trangThai: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
})

KhachHang.statics.login = async function(phone, password){
    const user = await this.findOne({ phone })
    console.log("user", user)
    if(user){
        const auth = await bcrypt.compare(password, user.matKhau)
        if(auth){
            // if(user.status == 'block'){
            //     throw Error('Tài khoản đã bị khóa!')
            //     // console.log('tai khoan bi khoa!')
            // }
            // else{
            //     return user
            // }
            return 'exist'
        }
        throw Error('Sai tài khoản hoặc mật khẩu')
    }
    throw Error('Sai tài khoản hoặc mật khẩu')
}



module.exports = mongoose.model('KhachHang',KhachHang)