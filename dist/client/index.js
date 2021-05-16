"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCraqClient = void 0;
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var src_1 = __importDefault(require("router6-history/src"));
var src_2 = require("router6/src");
var actionsMiddleware_1 = __importDefault(require("../core/actionsMiddleware"));
var createApp_1 = __importDefault(require("../core/createApp"));
var rehydrateError = function (error) {
    switch (error === null || error === void 0 ? void 0 : error.code) {
        case 404:
            return new src_2.NotFoundError(error.message);
        case 403:
            return new src_2.ForbiddenError(error.message);
        default:
            return undefined;
    }
};
var createCraqClient = function (context, App, _a) {
    var bundles = _a.bundles;
    context.router
        .use(function () { return function (_a, next) {
        var to = _a.to;
        var bundle = bundles[to.config.bundle];
        bundle().then(next);
    }; })
        .use(src_1.default())
        .use(actionsMiddleware_1.default(context, {
        executionFlow: function (execution, next, abort) {
            if (context.router.isStarted()) {
                next();
                execution.catch(function (e) {
                    if (src_2.isRoutingError(e)) {
                        context.router.error = e;
                    }
                });
            }
            else {
                execution.then(next, abort);
            }
        },
    }, 
    // @ts-ignore
    __SERVER_STATS__.actions));
    var CraqApp = createApp_1.default(App);
    var runPromise;
    return {
        run: function (href) {
            if (!runPromise) {
                runPromise = context.router.start(href, 
                // @ts-ignore
                rehydrateError(__SERVER_STATS__.error));
            }
            return {
                render: function (node) {
                    return runPromise.then(function () {
                        return react_dom_1.default.hydrate(react_1.default.createElement(CraqApp, { context: context }), node);
                    });
                },
            };
        },
    };
};
exports.createCraqClient = createCraqClient;
//# sourceMappingURL=index.js.map