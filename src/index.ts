/**
 * Created by championswimmer on 05/01/17.
 */

import * as ua from 'universal-analytics'
import {Request, Response, RequestHandler, NextFunction} from 'express'

export interface ExpressGAHandler extends RequestHandler {
    event: (options: GAEventOptions) => RequestHandler
}
export interface GAEventOptions {
    category: string
    action: string
    label?: string
    value?: string | number
}

export function ExpressGA(uaCode: string): ExpressGAHandler {
    let visitor = ua(uaCode);

    let middleware = <ExpressGAHandler> function (req: Request, res: Response, next: NextFunction) {
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
            || (<string>req.headers['x-forwarded-for']).split(',').pop()
        }).send();
        next();
    };

    middleware.event =
      function (options: GAEventOptions) {

        return <RequestHandler> function (req: Request, res: Response, next: NextFunction) {
            visitor.event(options.category, options.action, options.label, options.value)
            next()
        }
    }

    return middleware;
};

module.exports = ExpressGA
export default ExpressGA