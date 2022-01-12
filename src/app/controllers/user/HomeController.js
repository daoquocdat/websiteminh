const SanPham = require('../../models/SanPham')
const {mutipleMongooseToObject} = require('../../../util/mongoose')
const {mongooseToObject} = require('../../../util/mongoose')

class HomeController {

    index(req, res, next){
        SanPham.find({})
            .then((dssp) => {
                res.render('user/home',{
                    dssp: mutipleMongooseToObject(dssp),
                    layout: 'user'
                })
            })
            .catch(next)
    }
}

module.exports= new HomeController