"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getExpires = function (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    return "expires=" + date.toUTCString();
};
var format = function (_a) {
    var name = _a.name, value = _a.value, _b = _a.path, path = _b === void 0 ? '/' : _b, expires = _a.expires;
    return [name + "=" + value, expires && getExpires(expires), "path=" + path]
        .filter(Boolean)
        .join(';');
};
exports.default = format;
//# sourceMappingURL=format.js.map