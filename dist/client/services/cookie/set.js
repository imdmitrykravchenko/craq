"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = __importDefault(require("../../../core/utils/cookie/format"));
var cookieSetService = function (context, payload) {
    document.cookie = format_1.default(payload);
    return Promise.resolve();
};
exports.default = cookieSetService;
//# sourceMappingURL=set.js.map