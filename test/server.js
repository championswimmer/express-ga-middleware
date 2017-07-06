"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by championswimmer on 06/07/17.
 */
var express = require("express");
var dist_1 = require("../dist");
var app = express();
app.use(dist_1.default('UA-XXXXXXX-X'));
app.get('/event', dist_1.default('UA-XXXXXXX-X').event({
    category: "cat", action: "act", label: "lab", value: 10
}));
