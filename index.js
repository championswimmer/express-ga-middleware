/**
 * Created by championswimmer on 05/01/17.
 */
/**
 * Created by championswimmer on 29/12/16.
 */

const ua = require('universal-analytics');

function ExpressGA(uaCode) {
    this.uaCode = uaCode;

    this.middleware = function (req, res, next) {
        let visitor = ua(this.uaCode);
        if (!req.headers['x-forwarded-for']) {
            req.headers['x-forwarded-for'] = '0.0.0.0'
        }
        visitor.pageview({
            dp: req.originalUrl,
            dr: req.get('Referer'),
            ua: req.headers['user-agent'],
            uip: req.connection.remoteAddress
            || req.socket.remoteAddress
            || req.connection.socket.remoteAddress
            || req.headers['x-forwarded-for'].split(',').pop()
        }).send();
        next();
    };

    return this.middleware;
};


module.exports = ExpressGA;