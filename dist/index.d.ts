/// <reference types="express" />
import { Request, Response } from 'express';
declare function ExpressGA(uaCode: string): (req: Request, res: Response, next: any) => void;
export = ExpressGA;
export default ExpressGA;
