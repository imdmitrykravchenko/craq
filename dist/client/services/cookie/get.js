"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = __importDefault(require("../../../core/utils/cookie/parse"));
var cookieGetService = function (context, _a) {
    var name = _a.name, _b = _a.defaultValue, defaultValue = _b === void 0 ? null : _b;
    var value = parse_1.default(document.cookie, name);
    return Promise.resolve(value === null ? defaultValue : value);
};
exports.default = cookieGetService;
//# sourceMappingURL=get.js.map