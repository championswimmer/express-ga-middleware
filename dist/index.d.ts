/// <reference types="express" />
import { RequestHandler } from 'express';
declare module 'express' {
    interface Request {
        ga: {
            event: (options: GAEventOptions, emitted: (e: Error) => void) => void;
        };
    }
}
export interface ExpressGAHandler extends RequestHandler {
    event: (options: GAEventOptions) => RequestHandler;
}
export interface GAEventOptions {
    category: string;
    action: string;
    label?: string;
    value?: string | number;
}
export declare function ExpressGA(uaCode: string): ExpressGAHandler;
export default ExpressGA;
