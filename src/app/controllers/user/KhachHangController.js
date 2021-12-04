const KhachHang = require('../../models/KhachHang')
const ChiTietDonHang = require('../../models/ChiTietDonHang')
const DiaChi = require('../../models/DiaChi')
const DonHang = require('../../models/DonHang')
const {mutipleMongooseToObject} = require('../../../util/mongoose')
const {mongooseToObject} = require('../../../util/mongoose')

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

    themvaogiohang(req, res, next){
        var idSP = req.params.id
        var mau = req.body.mau
        var soLuong = req.body.soLuong
        req.user.addToCart(idSP, soLuong,mau)
        .then((a) =>{
            const user = req.user
            res.json({
                message:"Thêm vào giỏ hàng thành công",
                user
            })
        })
        .catch( err => console.error(err))
    }

    xoaKhoiGioHang(req,res,next){
        req.user.removeInCart(req.params.id)
        .then(() =>{
            console.log('xóa thành công')
            res.json(req.user)
            // res.redirect('/cart')
        })
        .catch( err => console.error(err))
            
    }

    xemGioHang(req, res, next){
        req.user
            .populate('gioHang.sp.idSanPham')
            .then(user =>{
                res.render("user/giohangs/xemGioHang",{
                    gioHang: user.gioHang
                })
            })
            .catch( err => console.error(err))
    }
    async xemGioHangPost(req, res, next){
        const arrayData = req.body.arrayData
        KhachHang.findOne({_id: req.user._id})
        .then((kh) => {   
            kh.gioHang.sp.forEach((item, i) => {
                kh.gioHang.sp[i].ghiChu = arrayData[i].note
            })
            kh.save()
            res.json({message: 'Qua giao hang'})
        })
        .catch((err) => console.log('lỗi xem gio hàng post: lỗi', err))
    }
    diaChiGiaoHang(req, res, next){
        Promise.all([
            KhachHang.findOne({_id: req.user._id}),
            DiaChi.find({maKhachHang: req.user._id})
        ])
        .then(([kh, diachi]) =>{
            var gioHang = kh.gioHang
            res.render('user/giohangs/diaChiGiaoHang',{
                gioHang: mongooseToObject(gioHang),
                diachi: mutipleMongooseToObject(diachi),
            })
        })
        
    }
    diaChiGiaoHangPost(req, res, next){
        console.log('đây là địa chỉ giao hàng post')
        console.log('req.body', req.body)
        if(req.body.giatri == 1){
            DiaChi.findOne({_id: req.body.maDiaChi})
            .then((diachi) =>{
                console.log('vào địa chỉ')
                var idDiaChi = diachi._id  
                var soNha = diachi.soNha  
                var phuongXa = diachi.phuongXa
                var quanHuyen =  diachi.quanHuyen
                var tinhTP = diachi.tinhTP
                res.json({ idDiaChi: idDiaChi, soNha: soNha, phuongXa: phuongXa, quanHuyen: quanHuyen, tinhTP: tinhTP })
            })
            .catch((err) => {
                console.log('lỗi giá trị 1', err)
            })
        }
        else if(req.body.giatri == 0){
            const diachi = new DiaChi({
                maKhachHang: req.user._id,
                soNha: req.body.soNha,
                phuongXa: req.body.phuongXa,
                quanHuyen: req.body.quanHuyen,
                tinhTP:req.body.tinhTP,
            })
            .save()
            .then((diachi) =>{
                console.log('lưu địa chỉ thành công')
                KhachHang.updateOne({_id: req.user._id},{
                    $push: {
                        diaChi: diachi._id
                    }
                })
                .then(() =>{
                    console.log('update địa chỉ khách hàng thành công')
                    var idDiaChi = diachi._id  
                    var soNha = diachi.soNha  
                    var phuongXa = diachi.phuongXa
                    var quanHuyen =  diachi.quanHuyen
                    var tinhTP = diachi.tinhTP
                    res.json({idDiaChi: idDiaChi, soNha: soNha, phuongXa: phuongXa, quanHuyen: quanHuyen, tinhTP: tinhTP })
                })
                .catch(() => {
                    console.log('update địa chỉ khách hàng thất bại')
                })
            })
            .catch((err)=>{
                console.log('lưu địa chỉ thất bại')
            })
        }
        
    }
    phuongThucThanhToan(req, res, next){
        res.render('user/giohangs/phuongThucThanhToan')
    }

    phuongThucThanhToanPost(req, res, next){
        console.log('phương thức thanh toán')
        var pttt = req.body.phuongThuc
        res.json({
            pttt: pttt
        })
    }
    
    kiemTraDonHang(req, res,next){
        KhachHang.findOne({_id: req.user._id}).populate('gioHang.sp.idSanPham')
        .then((kh) => {
            res.render('user/giohangs/kiemTraDonHang',{
                kh: mongooseToObject(kh)
            })
        })
    }
    xacThucDonHang(req, res, next){
        const donhang = new DonHang({
            maKhachHang: req.user.id,
            maDiaChi: req.body.idDiaChi,
            tongTienHang: req.user.gioHang.tongTien,
            phiGiaoHang: req.body.phiGiaoHang,
            tongTien: req.body.tongTien
        })
        .save()
        .then((donhang) => {
            console.log('tạo đơn hàng thành công')
            console.log('đơn hàng', donhang)
            const dssp = req.user.gioHang.sp
            const ctdh = new ChiTietDonHang({
                maDonHang: donhang._id,
                tongTien: donhang.tongTien
            })
            .save()
            .then((ctdh) =>{
                dssp.forEach((sp, i) => {
                    console.log('ctdh',ctdh)
                    ctdh.sp.push({
                        idSP:sp.idSanPham,
                        mau: sp.mau,
                        soLuong: sp.soLuong,
                        ghiChu: sp.ghiChu,
                    })
                })
                ctdh.save()
                DonHang.updateOne({
                    _id: donhang._id
                },{
                    maChiTietDonHang: ctdh._id
                })
                .then(() => { console.log('cap nhat ma chi tiet don hang')})
                .catch((err) => {console.log(err)})
                res.json({message: 'hoan tat don hang'})
            })
        })
        .catch((err) =>{
            console.log('lỗi tạo đơn hàng', err)
        })
    }

    hoanTatDonHang(req, res, next){
        res.render('user/giohangs/hoanTatDonHang')
    }
}

module.exports= new KhachHangController