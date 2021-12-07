const HangSanXuat = require('../../models/HangSanXuat')
const SanPham = require('../../models/SanPham')


const {mutipleMongooseToObject} = require('../../../util/mongoose')

const maxAge = 3*24*60*60

class HangSanXuatController {
    dshsx(req,res, next){
        HangSanXuat.find({})
        .then((dshsx) => {
            res.render('user/hangsx/dshsx', {
                dshsx: mutipleMongooseToObject(dshsx)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    chitiet(req, res, next){
        HangSanXuat.findOne({slug: req.params.slug})
        .then((hsx) => {
            SanPham.find({maHang: hsx._id})
            .then((dssp) => {
                console.log(dssp)
                res.render('user/hangsx/chiTiet', {
                    dssp: mutipleMongooseToObject(dssp)    
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports= new HangSanXuatController