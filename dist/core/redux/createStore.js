"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
exports.default = (function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.initialState, initialState = _c === void 0 ? {} : _c, _d = _b.middleware, middleware = _d === void 0 ? [] : _d, _e = _b.reducers, reducers = _e === void 0 ? {} : _e;
    return redux_1.createStore(redux_1.combineReducers(reducers), initialState, middleware.length ? redux_1.applyMiddleware.apply(void 0, __spreadArray([], __read(middleware))) : undefined);
});
//# sourceMappingURL=createStore.js.map