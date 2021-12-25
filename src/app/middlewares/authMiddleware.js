const jwt = require('jsonwebtoken')
const KhachHang = require('../../../src/app/models/KhachHang')
const NhanVien = require('../../../src/app/models/NhanVien')

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    console.log(token)
    if(token){
        jwt.verify(token, 'next user secret', (err, decodedToken)=>{
            if (err){
                console.log(err)
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

const requireAuthAdmin = (req, res, next) =>{
    const token = req.cookies.jwtAdmin
    console.log(token)
    if(token){
        jwt.verify(token, 'admin', (err, decodedToken)=>{
            if (err){
                console.log(err)
                res.redirect('/admin/login')
            }else{
                next()
            }
        })
    }
    else{
        res.redirect('/admin/login')
    }
}

const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt
    console.log(token)
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

const requireAuthStaff = (req, res, next) =>{
    const token = req.cookies.jwtNV
    console.log(token)
    if(token){
        jwt.verify(token, 'staff secret', (err, decodedToken)=>{
            if (err){
                console.log(err)
                res.redirect('/staff/login')
            }else{
                next()
            }
        })
    }
    else{
        res.redirect('/staff/login')
    }
}

const checkStaff = (req, res, next) =>{
    const token = req.cookies.jwtNV
    console.log(token)
    if(token){
        jwt.verify(token, 'staff secret',async (err, decodedToken)=>{
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

module.exports = { requireAuth,requireAuthStaff,requireAuthAdmin, checkUser, checkStaff}