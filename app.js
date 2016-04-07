var express = require("express");
var app = express(); 
var User = require("./User");


app.get("/", function(request, result) {
    result.send("hello");

    for(var i = 0; i < 3; i++){
        var u = new User({age: Math.ceil(Math.random()* 75) , username:"Sexy " + i });
        u.save();
    }
});

app.get("/users", function(req, res, next) {
    User.find()
        .exec()
        .then((data)=> res.json(data))
        .catch(console.log)
        .finally(next);
});

app.listen(3000, function(){
    console.log("running");
});