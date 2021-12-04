const SanPham = require('../../models/SanPham')
const {mutipleMongooseToObject} = require('../../../util/mongoose')
const {mongooseToObject} = require('../../../util/mongoose')

class SanPhamController {
    chitietsp(req, res, next){
        const sp = SanPham.findOne({slug: req.params.slug })
        .populate('maHang')
        .then((sp) => {
            res.render('user/sanphams/chitietsp',{
                sp: mongooseToObject(sp),
                layout: 'user'
            })
        })
        .catch(next)
    }
    dssp(req, res, next){
        SanPham.find({})
            .then((dssp) => {
                res.render('user/sanphams/dssp',{
                    dssp: mutipleMongooseToObject(dssp),
                    layout: 'user'
                })
            })
            .catch(next)
    }

}

module.exports= new SanPhamController