"use strict";
/**
 * Created by championswimmer on 05/01/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const universal_analytics_1 = require("universal-analytics");
function ExpressGA(uaCode) {
    this.uaCode = uaCode;
    this.middleware = function (req, res, next) {
        let visitor = universal_analytics_1.default(this.uaCode);
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
    return this.middleware;
}
;
exports.default = ExpressGA;
//# sourceMappingURL=index.js.map