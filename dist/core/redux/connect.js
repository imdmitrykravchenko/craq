"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextProvider = void 0;
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var context = react_1.createContext(null);
var ContextProvider = context.Provider;
exports.ContextProvider = ContextProvider;
var connect = function (mapStateToProps, mapContextToProps) {
    return function (Component) {
        return function (ownProps) {
            var stateProps = mapStateToProps
                ? react_redux_1.useSelector(mapStateToProps)
                : {};
            var contextProps = mapContextToProps
                ? mapContextToProps(react_1.useContext(context))
                : {};
            return react_1.default.createElement(Component, __assign(__assign(__assign({}, ownProps), stateProps), contextProps));
        };
    };
};
exports.default = connect;
//# sourceMappingURL=connect.js.map