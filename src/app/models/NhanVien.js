const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const NhanVien = new Schema({
    taiKhoanDangNhap: {
        type: String,
        unique: true,
        require: true,
    },
    matKhau: {
        type: String,
        unique: true,
        require: true,
    },
    hoTen: {
        type: String,
        require: true,
    },
    gioiTinh: {
        type: String,
    },
    soDienThoai: {
        type: String,
        require: true,
    },
    soCCCD: {
        type: Number,
    },
    diaChi: {
        type: String,
    },
    trangThai: {
        type: String,
    }
})

//hàm kiểm tra đăng nhập
NhanVien.statics.login = async function(taikhoan, matKhau){
    const nv = await this.findOne({ taikhoan })
    if(nv){
        const auth = await bcrypt.compare(matKhau, nv.matKhau)
        if(auth){
            if(nv.trangThai == 'khóa'){
                console.log('tai khoan bi khoa!')
                return 'Tài khoản đã bị khóa!'
            }
            else{
                return 'exist'
            }
        }
        throw Error('Sai tài khoản hoặc mật khẩu')
    }
    throw Error('Sai tài khoản hoặc mật khẩu')
}

module.exports = mongoose.model('NhanVien',NhanVien)