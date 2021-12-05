const jwt = require('jsonwebtoken')
const KhachHang = require('../../../src/app/models/KhachHang')
const NhanVien = require('../../../src/app/models/NhanVien')

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'next user secret', (err, decodedToken)=>{
            if (err){
                console.log(err,message)
                res.redirect('/login')
            }else{
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'next user secret',async (err, decodedToken)=>{
            if(err){
                res.locals.user = null
                res.status(500).json('token khong hop le')
                next()
            }else{
                //console.log("decode",decodedToken)
                let user = await KhachHang.findById(decodedToken.id)
                req.data = user
                req.user = user
                res.locals.user = user
                //console.log("user middlewares", user)
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }   
}

const checkStaff = (req, res, next) =>{
    const token = req.cookies.jwt
    console.log(token)
    if(token){
        jwt.verify(token, 'next user secret',async (err, decodedToken)=>{
            if(err){
                res.locals.staff = null
                res.status(500).json('token khong hop le')
                next()
            }else{
                console.log("decode",decodedToken)
                let staff = await NhanVien.findById(decodedToken.id)
                req.staff = staff
                res.locals.staff = staff
                console.log("user middlewares", staff)
                next()
            }
        })
    }else{
        res.locals.staff = null
        next()
    }   
}

const staffInfo = async(req, res, next)=>{
    console.log("req staff info",req.data)
    // let staff = await NhanVien.findOne({taiKhoanDangNhap: req.body.taikhoan})
    // req.staff = staff
    // res.locals.staff = staff
    // console.log("user middlewares", staff)
    next()
}

const checkMember = (req, res, next) =>{
    console.log('req.data',req.data)
    if (req.data)
    {
        console.log('laf khanh hang')
    }
    else{
        res.locals.user = null
        next()
    }
}
const checkAdmin = (req, res, next) =>{
    console.log('req.data',req.data)
    if (req.data)
    {
        
    }
    else{
        res.locals.user = null
        next()
    }
}
module.exports = { requireAuth, checkUser, checkStaff, staffInfo}