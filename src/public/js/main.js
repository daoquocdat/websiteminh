//Hàm format tiền
//input: giá trị tiền(kiểu chuỗi), tên đơn vị tiền(vd: vnd)
//output: giá trị đã format theo dạng x.xxx.xxx
function format_tien(n, currency) {
    return n.replace(/./g, function(c, i, a) {
        return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
    }) +' '+ currency
}