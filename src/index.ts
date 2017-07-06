/**
 * Created by championswimmer on 05/01/17.
 */

import * as ua from 'universal-analytics'
import {Request, Response} from 'express'

function ExpressGA(uaCode: string) {
    let visitor = ua(uaCode);

    let middleware = function (req: Request, res: Response, next) {
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
    middleware.event =
      function (
      category: string,
      action: string,
      label?: string,
      value?: string | number
    ) {
        visitor.event(category, action, label, value)
    }

    return middleware;
};

export = ExpressGA
export default ExpressGA
