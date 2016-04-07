var mongoose = require("mongoose");

mongoose.Promise = require('q').Promise;
mongoose.connect("mongodb://localhost:27017/fridgy");
mongoose.connection.on("error", console.log);

var userSchema = mongoose.Schema({
    username: String,
    age: Number
});


module.exports = mongoose.model("User", userSchema);
