/**
 * Created by championswimmer on 05/01/17.
 */

import ua from 'universal-analytics'
import {Request, Response} from 'express'

function ExpressGA(uaCode: String) {
    this.uaCode = uaCode;

    this.middleware = function (req: Request, res: Response, next) {
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
            || req.connection.remoteAddress
            || req.headers['x-forwarded-for'].split(',').pop()
        }).send();
        next();
    };

    return this.middleware;
};


export default ExpressGA;