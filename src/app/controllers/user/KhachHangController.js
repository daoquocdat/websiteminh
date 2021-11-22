const KhachHang = require('../../models/KhachHang')
const {mutipleMongooseToObject} = require('../../../util/mongoose')

class KhachHangController {

    //[GET] /dssp
    index(req, res, next){
        SanPham.find({})
            .then(sanphams => {
                res.render('dssanpham',{
                    sanphams: mutipleMongooseToObject(sanphams)
                })
            })
            .catch(next)
    }


}

module.exports= new KhachHangController