const SanPham = require('../../models/SanPham')
const HangSanXuat = require('../../models/HangSanXuat')
const {mutipleMongooseToObject} = require('../../../util/mongoose')
const {mongooseToObject} = require('../../../util/mongoose')
class SearchController {
    //[GET] /search
    search(req, res){
        SanPham.find({ 
            tenSanPham: {$regex: req.query.search, $options: 'i'} 
        })
        .then(dssp =>{
            console.log(dssp)
            res.render('user/search/search', {
                dssp: mutipleMongooseToObject(dssp),
                nameSearch: req.query.search
            })
        })
    }
}

module.exports= new SearchController