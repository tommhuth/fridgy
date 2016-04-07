var express = require("express");
var app = express();
var routes = require("./app/routes");
var db = require("./app/db");
var bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use("/", routes);

app.listen(3000, () => console.log("running"));

