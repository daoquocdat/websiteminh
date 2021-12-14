const Handlebars = require('handlebars')
const moment = require('moment')
module.exports = {
    sum: (a, b) => a + b,
    block_unblock_account: function (a) {
        if(a == 'hoat dong'){
            return '<a href="#" class="btn btn-danger btn-block-account">Khóa</a>'
        }          
        else{
            return '<a href="#" class="btn btn-success btn-block-account">Mở khóa</a>'
        }
    },

    still_stock: function (amount) {
        if(amount > 0){
            return '<div id="still_stock">Còn hàng</div>'
        }          
        else{
            return '<div id="still_stock">Hết hàng</div>'
        }
    },
    dateFormat: (date,options)=>{
        const formatToUse = (options && options.hash && options.hash.format) || "MM/DD/YYYY"
        return moment(date).format(formatToUse);
    },

    isdefined: function (value) {
        return value !== 0;
    },
}
