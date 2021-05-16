"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = __importDefault(require("../core/Context"));
var ServerContext = /** @class */ (function (_super) {
    __extends(ServerContext, _super);
    function ServerContext(_a) {
        var store = _a.store, router = _a.router, ctx = _a.ctx, registries = _a.registries;
        var _this = _super.call(this, { store: store, router: router, registries: registries }) || this;
        _this.ctx = ctx;
        _this.serviceContext = __assign(__assign({}, _this.serviceContext), { ctx: ctx });
        return _this;
    }
    return ServerContext;
}(Context_1.default));
exports.default = ServerContext;
//# sourceMappingURL=ServerContext.js.map