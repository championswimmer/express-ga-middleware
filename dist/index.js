"use strict";
/**
 * Created by championswimmer on 05/01/17.
 */
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
        function (category, action, label, value) {
            visitor.event(category, action, label, value);
        };
    return middleware;
}
;
exports.default = ExpressGA;
module.exports = ExpressGA;
//# sourceMappingURL=index.js.map