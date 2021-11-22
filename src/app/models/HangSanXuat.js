const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const HangSanXuat = new Schema({
    tenHangSanXuat: { type: String},
})

module.exports = mongoose.model('HangSanXuat',HangSanXuat)