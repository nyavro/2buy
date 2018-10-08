"use strict";
exports.__esModule = true;
var moment = require("moment");
exports.serverFormat = 'YYYY-MM-DD';
exports.dateFormat = 'DD.MM.YYYY';
exports.strToDate = function (dateString, format) {
    if (format === void 0) { format = exports.serverFormat; }
    return (moment(dateString, format));
};
exports.getToday = function (format) {
    if (format === void 0) { format = exports.serverFormat; }
    return moment(moment().format(exports.serverFormat), exports.serverFormat).format(format);
};
exports.format = function (dateString, targetFormat) {
    return moment(dateString, exports.serverFormat).format(targetFormat);
};
exports.convert = function (dateString, sourceFormat, targetFormat) {
    return moment(dateString, sourceFormat).format(targetFormat);
};
