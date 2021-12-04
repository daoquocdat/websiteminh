const KhachHang = require('../../../../src/app/models/KhachHang')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {mutipleMongooseToObject} = require('../../../../src/util/mongoose')

const maxAge = 3*24*60*60
const createToken = (id) =>{
    return jwt.sign( { id  }, 'next user secret', { 
        expiresIn: maxAge 
    })
}
class AuthController {
    loginGet(req, res, next){
        res.render('user/auth/login')
    }

    async loginPost(req, res, next){
        console.log('login post!!')
        console.log(req.body)
        var  phone = req.body.phone
        var  password = req.body.password
        try{
            const kh = await KhachHang.login(phone, password)
            if(kh == 'exist'){
                console.log('tồn tại kh')
            }
            const token = createToken(kh._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
            res.json( { kh: kh._id })
        }
        catch(err){
            const errors = err
            console.log("loi",err)
            res.json({ error: 'Sai tài khoản hoặc mật khẩu' })
        }
    }

    registerGet(req, res, next){
        res.render('user/auth/register')
    }

    async registerPost(req , res , next){
        var  hoTen = req.body.nameInput
        var  email = req.body.emailInput
        var  matKhau = req.body.passwordInput
        var  gioiTinh = req.body.sexInput
        var  phone = req.body.phoneInput
        try{
            const salt = await bcrypt.genSalt()
            matKhau  = await bcrypt.hash(matKhau, salt)
            KhachHang.findOne({phone: phone})
            .then((khachhang) => {
                if(khachhang == null){
                    const kh = new KhachHang({
                        email: email,
                        phone: phone,
                        matKhau: matKhau, 
                        hoTen: hoTen , 
                        gioiTinh: gioiTinh, 
                        trangThai: 'hoat dong'
                   })
                   .save()
                   .then((kh) => {
                        console.log(kh._id)
                    // tạo token
                        const token = createToken(kh._id)
                        console.log('dang ky thanh cong')
                        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
                        res.json({ kh: kh._id, message: 'dang ky thanh cong'})   
                   })
                   .catch((err) => {
                       console.log('đăng ký thất bại', err)
                   })
                   
                }
                else{
                    console.log("khach hang",khachhang)
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
            console.log('tai khoan da co nguoi su dung')
            res.json( {error: error } )
        }
    }

    logout_get(req, res, next){
        res.cookies('jwt', '', { maxAge: 1 })
        res.redirect('/')
    }
}

module.exports= new AuthController