"use strict";
/**
 * Created by championswimmer on 05/01/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ua = require("universal-analytics");
function ExpressGA(uaCode) {
    var visitor = ua(uaCode);
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
        next();
    };
    middleware.event =
        function (options) {
            return function (req, res, next) {
                visitor.event(options.category, options.action, options.label, options.value);
                next();
            };
        };
    return middleware;
}
exports.ExpressGA = ExpressGA;
;
module.exports = ExpressGA;
exports.default = ExpressGA;
//# sourceMappingURL=index.js.map