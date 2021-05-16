"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __importDefault(require("router6/src"));
var redux_1 = require("redux");
var ServerContext_1 = __importDefault(require("./ServerContext"));
exports.default = (function (_a) {
    var reducers = _a.reducers, actions = _a.actions, components = _a.components, routes = _a.routes;
    return function (ctx) {
        return new ServerContext_1.default({
            ctx: ctx,
            store: redux_1.createStore(redux_1.combineReducers(reducers)),
            router: new src_1.default(routes),
            registries: { actions: actions, components: components },
        });
    };
});
//# sourceMappingURL=configureContext.js.map