"use strict";

var express = require("express");
var bodyParser = require('body-parser');
var routes = require("./app/routes");
var db = require("./app/db");
var app = express();

app.use(bodyParser.json());

app.use("/api", routes);

//global error handlers
app.use((error, request, result, next) => result.status(error.status ||  500).end());
app.use((request, result, next) => result.status(404).end());

app.listen(3000, () => console.log("Ready"));

db.seed();
