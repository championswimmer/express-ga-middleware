/**
 * Created by championswimmer on 05/01/17.
 */

/*
This is an example of how to use this library.
This file will not work directly as - node example.js
There are certain things you need to do, to run and test this
    a. Install express module (not in our deps, as we do not directly need it)
    b. Use a read Google Analytics tracking id (instead of UA-XXXX-X here)
 */

const express = require('express');
const app = express();

// Require the library
const expressGa = require('express-ga-middleware');

// Construct a middleware and use it globally
app.use(expressGa('UA-XXXXXX-X'));

// Add your routes. The middleware will automatically report them
app.get('/', function (req,res) {res.send('hello world')});


app.listen(3456, function () {
    console.log("App running on port 3456");
});