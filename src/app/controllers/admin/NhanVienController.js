const KhachHang = require('../../../../src/app/models/KhachHang')
const NhanVien = require('../../../../src/app/models/NhanVien')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {mutipleMongooseToObject} = require('../../../../src/util/mongoose')
const {mongooseToObject} = require('../../../../src/util/mongoose')

const maxAge = 3*24*60*60
const createToken = (id) =>{
    return jwt.sign( { id  }, 'next user secret', { 
        expiresIn: maxAge 
    })
}
class NhanVienController {
    dangKyNV(req, res, next){
        res.render('admin/nhanviens/formRegister',{
            layout: 'admin'
        })
    }

    async dangKyNVPost(req , res , next){
        var  taiKhoan = req.body.taiKhoan
        console.log(taiKhoan)
        var  matKhau = req.body.matKhau
        var  hoTen = req.body.hoTen
        var  gioiTinh = req.body.gioiTinh
        var  soDienThoai = req.body.soDienThoai
        var  cccd = req.body.cccd
        var  diaChi = req.body.diaChi
        try{
            const salt = await bcrypt.genSalt()
            matKhau  = await bcrypt.hash(matKhau, salt)
            NhanVien.findOne({taiKhoanDangNhap: req.body.taiKhoan})
            .then((nhanvien) => {
                if(nhanvien == null){
                    const nv = new NhanVien({
                        taiKhoanDangNhap: taiKhoan,
                        matKhau: matKhau,
                        hoTen: hoTen,
                        gioiTinh: gioiTinh,
                        soDienThoai: soDienThoai,
                        soCCCD: cccd,
                        diaChi: diaChi,
                        trangThai: 'hoat dong'
                   })
                   .save()
                   .then((nv) => {
                        console.log(nv._id)
                    // tạo token
                        const token = createToken(nv._id)
                        console.log(token)
                        console.log('dang ky thanh cong')
                        res.cookie('jwtNV', token, { httpOnly: true, maxAge: maxAge * 1000})
                        res.json({ nv: nv._id, message: 'dang ky thanh cong'})   
                   })
                   .catch((err) => {
                       console.log('đăng ký thất bại', err)
                   })
                   
                }
                else{
                    console.log("khach hang",nhanvien)
                    const error = 'tai khoan da co nguoi su dung'
                    console.log('tai khoan da co nguoi su dung')
                    res.json( {error: error } )
                }
                
            })
            .catch((err) =>{
                console.log(err)
                console.log('lỗi server')
            })

        }
        catch(err){
            const error = 'tai khoan da co nguoi su dung'
            console.log('tai khoan da co nguoi su dung', err)
            res.json( {error: error } )
        }
    }

    dsnv(req, res, next){
        NhanVien.find({})
        .then((dsnv) => {
            res.render('admin/nhanviens/dsnv', {
                dsnv: mutipleMongooseToObject(dsnv),
                layout: 'admin'
            })
        })
    }

    khoaNV(req, res,next){
        console.log(req.params.id)
        console.log(req.body)
        if(req.body.trangThai == 'hoat dong'){
            NhanVien.updateOne({_id: req.params.id}, {
                trangThai: 'khoa', 
            })
            .then(() => {
                res.json({message: 'khóa tài khoản thành công'})
            })
            .catch(next)
        }
        else if(req.body.trangThai == 'khoa'){
            NhanVien.updateOne({_id: req.params.id}, {
                trangThai: 'hoat dong'
            })
            .then(() => {
                res.json({message: 'mở khóa tài khoản thành công'})
            })
            .catch(next)
        }
    }
    formSua(req, res, next){
        NhanVien.findOne({_id: req.params.id})
        .then((nhanvien) => {
            res.render('admin/nhanviens/formSua', {
                nhanvien: mongooseToObject(nhanvien),
                layout: 'admin'
            })
        })
        
    }

    sua(req, res, next){
        NhanVien.updateOne({_id: req.params.id}, {
            hoTen: req.body.hoTen,
            soDienThoai: req.body.soDienThoai,
            soCCCD: req.body.cccd,
        })
        .then(() =>{
            console.log('update nv thành công')
            res.json({
                message: 'update nv thành công'
            })
        })
        .catch((err) => {
            console.log('lỗi update nv', err)
        })
    }
}

module.exports= new NhanVienController