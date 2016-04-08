"use strict";

var express = require("express");
var bodyParser = require('body-parser');
var routes = require("./app/routes");
var db = require("./app/db");
var app = express();


app.use(bodyParser.json());

app.use("/", routes);

app.listen(3000, () => console.log("Ready"));

db.seed();