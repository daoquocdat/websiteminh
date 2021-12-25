const KhachHang = require('../../../../src/app/models/KhachHang')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {mutipleMongooseToObject} = require('../../../../src/util/mongoose')

const maxAge = 3*24*60*60
const createToken = (id) =>{
    return jwt.sign( { id  }, 'admin', { 
        expiresIn: maxAge 
    })
}
class AuthController {
    loginGet(req, res, next){
        res.render('admin/auth/formLogin',{
            layout: 'loginAdmin'
        })
    }

    async loginPost(req, res, next){
        console.log('login admin post!!')
        console.log(req.body)
        var  taikhoan = req.body.taikhoan
        var  matkhau = req.body.matkhau
        try{
            if(taikhoan == 'admin' && matkhau == 'admin'){
                console.log('đây là admin')
                const token = createToken('admin')
                console.log(token)
                res.cookie('jwtAdmin', token, { httpOnly: true, maxAge: maxAge * 1000})
                res.json( { message: 'đây là admin' })

            }
            else{
                console.log('đăng nhập không hợp lệ')
                res.json( { error: 'Đăng nhập không hợp lệ' })
            }

        }
        catch(err){
            const errors = err
            console.log("loi",err)
            res.json({ error: 'Sai tài khoản hoặc mật khẩu' })
        }
    }

    logout_get(req, res, next){
        res.cookie('jwtAdmin', '', { maxAge: 1 })
        res.redirect('/')
    }
}

module.exports= new AuthController