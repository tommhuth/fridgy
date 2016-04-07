/**
 * Created by Tomm on 07.04.2016.
 */
var mongoose = require("mongoose");
var q = require('q');

mongoose.Promise = q.Promise;
mongoose.connect("mongodb://localhost:27017/fridgy");
mongoose.connection.on("error", console.log);

module.exports = mongoose;