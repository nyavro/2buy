"use strict";
exports.__esModule = true;
exports.sleep = function (duration) { return new Promise(function (resolve) { return setTimeout(resolve, duration); }); };
