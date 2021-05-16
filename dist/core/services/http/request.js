"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var qs_1 = __importDefault(require("qs"));
var url_1 = __importDefault(require("url"));
var types_1 = require("./types");
var handleResponse = function (response) {
    var contentType = response.headers.get('Content-Type');
    var done = function (result) { return (response.ok ? result : Promise.reject(result)); };
    if (!contentType) {
        return done(null);
    }
    if (contentType.includes('json')) {
        return response.json().then(done);
    }
    return response.text().then(done);
};
var httpRequestService = function (context, _a) {
    var _b = _a.protocol, protocol = _b === void 0 ? 'https' : _b, _c = _a.contentType, contentType = _c === void 0 ? 'application/json' : _c, _d = _a.method, method = _d === void 0 ? types_1.Method.Get : _d, _e = _a.mode, mode = _e === void 0 ? types_1.Mode.Cors : _e, _f = _a.query, query = _f === void 0 ? {} : _f, host = _a.host, pathname = _a.pathname, body = _a.body, credentials = _a.credentials;
    var search = qs_1.default.stringify(query, { arrayFormat: 'brackets' });
    var fetchUrl = url_1.default.format({
        protocol: protocol,
        host: host,
        pathname: pathname,
        search: search ? "?" + search : undefined,
    });
    return cross_fetch_1.default(fetchUrl, {
        method: method,
        body: body,
        mode: mode,
        credentials: credentials,
        headers: {
            'Content-Type': contentType,
        },
    }).then(handleResponse);
};
exports.default = httpRequestService;
//# sourceMappingURL=request.js.map