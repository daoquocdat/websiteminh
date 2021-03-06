
const NhanVien = require('../../models/NhanVien')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {mutipleMongooseToObject} = require('../../../../src/util/mongoose')

const maxAge = 3*24*60*60
const createToken = (id) =>{
    return jwt.sign( {id}, 'staff secret', { 
        expiresIn: maxAge 
    })
}
class AuthController {
    loginGet(req, res, next){
        res.render('staff/auth/formLogin',{
            layout: 'loginStaff'
        })
    }

    async loginPost(req, res, next){
        var  taikhoan = req.body.taikhoan
        var  matkhau = req.body.matkhau
        console.log('taikhoan', taikhoan)
        console.log('matkhau', matkhau)
        try{
            const nv = await NhanVien.login(taikhoan, matkhau)
            
            if(nv == 'Tài khoản đã bị khóa!'){
                console.log('Tai khoan da bi khoa')
                res.json({message: 'Tài khoản đã bị khóa!'})
            }
            else{
                console.log('tồn tại nv')
                const token = createToken(nv._id)
                res.cookie('jwtNV', token, { httpOnly: true, maxAge: maxAge * 1000})
                res.json( { nv: nv._id, message: 'Đăng nhập thành công' })
            }
            
        }
        catch(err){
            const errors = err
            console.log("loi",err)
            res.json({ error: 'Sai tài khoản hoặc mật khẩu' })
        }
    }

    logout_get(req, res, next){
        res.cookie('jwtNV', '', { maxAge: 1 })
        res.redirect('/staff/login')
    }
}

module.exports= new AuthController