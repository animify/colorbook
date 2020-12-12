"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = debounce;
function debounce(fn, time) {
    var timeout = void 0;
    return function () {
        if (timeout) {
            timeout = clearTimeout(timeout);
        }
        timeout = setTimeout(fn.bind.apply(fn, [null].concat(Array.prototype.slice.call(arguments))), time);
    };
}