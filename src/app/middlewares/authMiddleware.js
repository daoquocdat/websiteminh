const jwt = require('jsonwebtoken')
const KhachHang = require('../../../src/app/models/KhachHang')
const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    console.log("token",token)
    //check json web tolen exists & is verified
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
                let user = await KhachHang.findById(decodedToken.id)
                req.data = user
                req.user = user
                res.locals.user = user.toObject()
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }   
}

module.exports = { requireAuth, checkUser}