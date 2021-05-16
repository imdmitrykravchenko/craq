"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var react_1 = __importDefault(require("react"));
var server_1 = __importDefault(require("react-dom/server"));
var loadBundles = function (bundles) {
    return Promise.all(Object.values(bundles).map(function (bundle) { return bundle(); }));
};
var stingified = function (value) { return "JSON.parse('" + JSON.stringify(value) + "')"; };
var formatAttributes = function (attributes) {
    return Object.entries(attributes)
        .filter(function (_a) {
        var _b = __read(_a, 2), _ = _b[0], value = _b[1];
        return value;
    })
        .reduce(function (result, _a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return __spreadArray(__spreadArray([], __read(result)), [key + "=\"" + value + "\""]);
    }, [])
        .join(' ');
};
var formatJSResource = function (_a) {
    var async = _a.async, defer = _a.defer, src = _a.src, _b = _a.code, code = _b === void 0 ? '' : _b;
    return "<script " + formatAttributes({
        async: async,
        defer: defer,
        src: src,
        type: 'text/javascript',
    }) + ">" + code + "</script>";
};
var formatCSSResource = function (_a) {
    var href = _a.href, style = _a.style;
    return style
        ? "<style type=\"text/css\">" + style + "</style>"
        : "<link " + formatAttributes({
            href: href,
            rel: 'stylesheet',
        }) + " />";
};
var defineVar = function (name, value) {
    return formatJSResource({ type: 'js', code: "window." + name + " = " + value + ";" });
};
var placeFilter = function (value) { return function (_a) {
    var place = _a.place;
    return place === value;
}; };
var renderBefore = function (_a) {
    var route = _a.route, scripts = _a.scripts, styles = _a.styles, state = _a.state, options = _a.options;
    var _b = options.formatMeta(route, state), title = _b.title, description = _b.description, canonical = _b.canonical;
    return "<!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <title>" + title + "</title>\n        <meta name=\"description\" content=\"" + description + "\" />\n        <link rel=\"icon\" href=\"data:,\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0\">\n        " + styles.filter(placeFilter('head')).map(formatCSSResource).join('\n') + "\n        " + scripts.filter(placeFilter('head')).map(formatJSResource).join('\n') + "\n        " + (canonical ? "<link rel=\"canonical\" href=\"" + canonical + "\" />" : '') + "\n      </head>\n      <body>\n        <div id=\"root\">";
};
var renderAfter = function (_a) {
    var scripts = _a.scripts, state = _a.state, stats = _a.stats;
    return "</div>\n        " + defineVar('__SERVER_STATS__', stingified(stats)) + "\n        " + defineVar('__INITIAL_STATE__', stingified(state)) + "\n        " + scripts.filter(placeFilter('body')).map(formatJSResource).join('\n') + "\n      </body>\n    </html>";
};
var hasExt = function (ext) { return function (link) { return link.split('.').pop() === ext; }; };
var isJs = hasExt('js');
var isCss = hasExt('css');
var usefulChunks = ['vendor', 'bundle'];
var getStaticReducer = function (assetsByChunkName, pred, additionalChunk) {
    if (additionalChunk === void 0) { additionalChunk = undefined; }
    return function (set, chunkName) {
        return __spreadArray(__spreadArray([], __read((additionalChunk ? assetsByChunkName[additionalChunk].filter(pred) : []))), __read(assetsByChunkName[chunkName].filter(pred))).reduce(function (result, link) { return result.add(link); }, set);
    };
};
var addAssetsPath = function (path) { return "/assets/" + path; };
var getStats = function (options) {
    var statsFilePath = options.statsFilePath;
    console.log('attempt to parse stats.json', statsFilePath);
    if (fs_1.default.existsSync(statsFilePath)) {
        return Promise.resolve(JSON.parse(fs_1.default.readFileSync(statsFilePath).toString()));
    }
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(getStats(options));
        }, 2000);
    });
};
var chunksUnderstand;
var render = function (response, head, stream, tail) {
    return new Promise(function (resolve, reject) {
        stream.on('error', reject);
        stream.once('readable', function () {
            response.write(head);
            stream.pipe(response, { end: false });
            stream.on('end', function () {
                response.write(tail);
                response.end();
            });
            resolve();
        });
    });
};
var html = function (context, App, _a) {
    var bundles = _a.bundles, options = _a.options;
    return __awaiter(void 0, void 0, void 0, function () {
        var assetsByChunkName, route, _b, bundle, error, styles, scripts, state, renderPayload;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!chunksUnderstand) {
                        chunksUnderstand = loadBundles(bundles)
                            .then(function () { return getStats(options); })
                            .then(function (result) { return result.assetsByChunkName; });
                    }
                    return [4 /*yield*/, chunksUnderstand];
                case 1:
                    assetsByChunkName = _c.sent();
                    route = context.router.currentRoute;
                    _b = route.config, bundle = _b.bundle, error = _b.error;
                    styles = __spreadArray([], __read(usefulChunks.reduce(getStaticReducer(assetsByChunkName, isCss, bundle), new Set()))).map(function (href) { return ({
                        href: addAssetsPath(href),
                        type: 'css',
                        place: 'head',
                    }); });
                    scripts = __spreadArray([], __read(__spreadArray([], __read(usefulChunks.reduce(getStaticReducer(assetsByChunkName, isJs), new Set()))).map(function (src) { return ({
                        type: 'js',
                        src: addAssetsPath(src),
                        defer: true,
                        place: 'body',
                    }); })));
                    context.ctx.res.writeHead(error ? Number(route.name) : 200, {
                        'Content-Type': 'text/html;charset=UTF-8',
                    });
                    state = context.getStore().getState();
                    renderPayload = {
                        stats: context.stats,
                        state: state,
                        route: route,
                        styles: styles,
                        scripts: scripts,
                        options: options,
                    };
                    return [2 /*return*/, render(context.ctx.res, renderBefore(renderPayload), server_1.default.renderToNodeStream(react_1.default.createElement(App, { context: context })), renderAfter(renderPayload))];
            }
        });
    });
};
exports.default = html;
//# sourceMappingURL=html.js.map