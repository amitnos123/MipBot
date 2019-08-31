exports.isInteger = function (str) {
    let patt = new RegExp('^([0-9]+)$');
    return patt.test(str);
}