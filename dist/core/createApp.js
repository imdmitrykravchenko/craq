"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var src_1 = require("router6-react/src");
var connect_1 = require("./redux/connect");
exports.default = (function (Content) { return function (_a) {
    var context = _a.context;
    return (react_1.default.createElement(src_1.RouterProvider, { router: context.router },
        react_1.default.createElement(connect_1.ContextProvider, { value: context.componentContext },
            react_1.default.createElement(react_redux_1.Provider, { store: context.getStore() },
                react_1.default.createElement(Content, { context: context })))));
}; });
//# sourceMappingURL=createApp.js.map