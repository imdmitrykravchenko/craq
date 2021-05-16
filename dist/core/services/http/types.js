"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = exports.Credentials = exports.Method = void 0;
var Method;
(function (Method) {
    Method["Get"] = "GET";
    Method["Post"] = "POST";
    Method["Put"] = "PUT";
    Method["Delete"] = "DELETE";
})(Method = exports.Method || (exports.Method = {}));
var Credentials;
(function (Credentials) {
    Credentials["Include"] = "include";
    Credentials["Omit"] = "omit";
})(Credentials = exports.Credentials || (exports.Credentials = {}));
var Mode;
(function (Mode) {
    Mode["Cors"] = "cors";
    Mode["NoCors"] = "no-cors";
})(Mode = exports.Mode || (exports.Mode = {}));
//# sourceMappingURL=types.js.map