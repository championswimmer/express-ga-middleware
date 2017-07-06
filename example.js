/**
 * Created by championswimmer on 06/07/17.
 */
const expGa = require('./dist/index.js')

// Use this in express route
// app.use(pageViewMiddleware)
var pageViewMiddleWare = expGa('UA-XXXXXXX-X')


//This one generates events

pageViewMiddleWare.event('a', 'b')

