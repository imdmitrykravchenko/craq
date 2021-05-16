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
var Context = /** @class */ (function () {
    function Context(_a) {
        var _this = this;
        var store = _a.store, router = _a.router, registries = _a.registries;
        this.registries = registries;
        this.stats = {};
        this.store = store;
        this.router = router;
        this.actionContext = {
            router: router,
            getState: function () { return store.getState(); },
            dispatch: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.dispatch.apply(_this, __spreadArray([], __read(args)));
            },
            action: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.action.apply(_this, __spreadArray([], __read(args)));
            },
            service: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.service.apply(_this, __spreadArray([], __read(args)));
            },
        };
        this.componentContext = {
            action: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.action.apply(_this, __spreadArray([], __read(args)));
            },
        };
        this.serviceContext = {
            service: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.service.apply(_this, __spreadArray([], __read(args)));
            },
        };
    }
    Context.prototype.dispatch = function (action) {
        return Promise.resolve(this.store.dispatch(action));
    };
    Context.prototype.action = function (action, payload) {
        return Promise.resolve(action(this.actionContext, payload));
    };
    Context.prototype.service = function (service, payload) {
        return Promise.resolve(service(this.serviceContext, payload));
    };
    Context.prototype.getStore = function () {
        return this.store;
    };
    Context.prototype.getAction = function (name) {
        return this.registries.actions.get(name);
    };
    Context.prototype.getComponent = function (name, type) {
        return this.registries.components.get([type, name].filter(Boolean).join('/'));
    };
    Context.prototype.getComponentsByType = function (type) {
        var typePrefix = type + "/";
        return Object.entries(this.registries.components.entries()).reduce(function (result, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], value = _c[1];
            return key.startsWith(typePrefix)
                ? __assign(__assign({}, result), (_b = {}, _b[key.replace(typePrefix, '')] = value, _b)) : result;
        }, {});
    };
    return Context;
}());
exports.default = Context;
//# sourceMappingURL=Context.js.map