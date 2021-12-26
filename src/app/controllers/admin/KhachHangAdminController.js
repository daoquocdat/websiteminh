const KhachHang = require('../../../../src/app/models/KhachHang')
const {mutipleMongooseToObject} = require('../../../../src/util/mongoose')
class NewsController {

    dsKhachHang(req, res, next){
        KhachHang.find({})
        .then((dskh) =>{
            res.render('admin/khachhangs/dskh', {
                dskh: mutipleMongooseToObject(dskh),
                layout: 'admin'
            })
        })
        .catch(next)
    }

    khoaKhachHang(req, res,next){
        if(req.body.trangThai == 'hoat dong'){
            KhachHang.updateOne({_id: req.params.id}, {
                trangThai: 'khoa', 
            })
            .then(() => {
                res.json({message: 'khóa tài khoản thành công'})
            })
            .catch(next)
        }
        else if(req.body.trangThai == 'khoa'){
            KhachHang.updateOne({_id: req.params.id}, {
                trangThai: 'hoat dong'
            })
            .then(() => {
                res.json({message: 'mở khóa tài khoản thành công'})
            })
            .catch(next)
        }
    }
}

module.exports= new NewsController