/**
 * Created by championswimmer on 06/07/17.
 */
import * as express from 'express'
import { ExpressGA } from '../dist'
import {Application} from 'express-serve-static-core'

const app: Application =  express();

app.use(ExpressGA('UA-XXXXXXX-X'));

app.get('/event', ExpressGA('UA-XXXXXXX-X').event({
  category: "cat", action: "act", label: "lab", value: 10
}))





