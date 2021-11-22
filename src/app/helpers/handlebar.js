const Handlebars = require('handlebars')

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
}
