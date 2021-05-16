"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseCookieFromString = function (cookies, name) {
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
var cookieGetService = function (context, _a) {
    var name = _a.name, _b = _a.defaultValue, defaultValue = _b === void 0 ? null : _b;
    var cookie;
    if (SERVER) {
        // @ts-ignore
        cookie = context.ctx.get('Cookie') || '';
    }
    if (CLIENT) {
        cookie = document.cookie;
    }
    var value = parseCookieFromString(cookie, name);
    return Promise.resolve(value === null ? defaultValue : value);
};
exports.default = cookieGetService;
//# sourceMappingURL=get.js.map