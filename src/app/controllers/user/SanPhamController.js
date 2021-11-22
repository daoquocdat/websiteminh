const SanPham = require('../../models/SanPham')
const {mutipleMongooseToObject} = require('../../../util/mongoose')

class SanPhamController {

    //[GET] /dssp/:slug
    show(req, res, next){
        const result = SanPham.findOne({slug: req.params.slug })
            .then((result) => {
                console.log(result)
                // res.json(result)
                res.render('sanphams/show',{
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