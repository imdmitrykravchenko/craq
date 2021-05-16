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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = __importDefault(require("qs"));
var src_1 = require("router6/src");
var compileParam = function (param, params) {
    return param.replace(/:(\w+)/g, function (_, name) { return params[name]; });
};
var actionsMiddleware = function (context, _a, stats) {
    var handleRoutingError = _a.handleRoutingError, executionFlow = _a.executionFlow;
    if (stats === void 0) { stats = {}; }
    return function (router) {
        return function (_a, next, abort) {
            var to = _a.to, type = _a.type;
            var routerStarted = router.isStarted();
            var execution = Promise.all((to.config.actions || [])
                .map(function (nameWithParams) {
                var _a = __read(nameWithParams.split('?'), 2), name = _a[0], _b = _a[1], query = _b === void 0 ? '' : _b;
                return {
                    name: name,
                    params: qs_1.default.parse(query),
                };
            })
                .filter(function (_a) {
                var name = _a.name;
                return routerStarted || !stats[name];
            })
                .map(function (_a) {
                var _b;
                var name = _a.name, params = _a.params;
                var action = context.getAction(name);
                if (!action) {
                    return Promise.resolve((_b = {}, _b[name] = false, _b));
                }
                return context
                    .action(action, {
                    type: type,
                    route: to,
                    params: Object.entries(params).reduce(function (result, _a) {
                        var _b;
                        var _c = __read(_a, 2), key = _c[0], value = _c[1];
                        return (__assign(__assign({}, result), (_b = {}, _b[key] = compileParam(value, to.params), _b)));
                    }, {}),
                })
                    .then(function () {
                    var _a;
                    return (_a = {}, _a[name] = true, _a);
                }, function (e) {
                    var _a;
                    console.log("error during action " + name, e);
                    if (src_1.isRoutingError(e)) {
                        e.meta = { path: to.path };
                        if (handleRoutingError) {
                            return handleRoutingError(e, next, abort);
                        }
                        throw e;
                    }
                    return _a = {}, _a[name] = false, _a;
                });
            }));
            executionFlow(execution, next, abort);
        };
    };
};
exports.default = actionsMiddleware;
//# sourceMappingURL=actionsMiddleware.js.map