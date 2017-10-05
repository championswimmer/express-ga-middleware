"use strict";
/**
 * Created by championswimmer on 05/01/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ua = require("universal-analytics");
function ExpressGA(uaCode) {
    var visitor = ua(uaCode);
    function GAEventMiddleware(options) {
        return function (req, res, next) {
            visitor.event(options.category, options.action, options.label, options.value).send();
            next();
        };
    }
    function GAEventEmitter(options, emitted) {
        visitor.event(options.category, options.action, options.label, options.value, function (err) { return emitted ? emitted(err) : null; });
    }
    var middleware = function (req, res, next) {
        if (!req.headers['x-forwarded-for']) {
            req.headers['x-forwarded-for'] = '0.0.0.0';
        }
        visitor.pageview({
            dp: req.originalUrl,
            dr: req.get('Referer'),
            ua: req.headers['user-agent'],
            uip: req.connection.remoteAddress
                || req.socket.remoteAddress
                || req.connection.remoteAddress
                || req.headers['x-forwarded-for'].split(',').pop()
        }).send();
        req.ga = {
            event: GAEventEmitter
        };
        next();
    };
    middleware.event = GAEventMiddleware;
    return middleware;
}
exports.ExpressGA = ExpressGA;
module.exports = ExpressGA;
exports.default = ExpressGA;
//# sourceMappingURL=index.js.map