"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse = function (cookies, name) {
    var nameEQ = name + "=";
    var ca = cookies.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};
exports.default = parse;
//# sourceMappingURL=parse.js.map