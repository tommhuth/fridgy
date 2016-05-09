"use strict";
 
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import mustache from 'mustache-express';
import { connect, seed } from './db';

let app = express();

//settings
app.engine('mustache', mustache());
app.use(bodyParser.json());
app.set('views', './src/server/views');
app.set('view engine', 'mustache');

//static files
app.use("/public", express.static("public"));

//routes
app.use("/api", routes);
app.use("/", (request, result) => result.render('index'));

//global handlers
app.use((error, request, result, next) => {
    result.status(error.status ||  500);

    if(error.body) result.json(error.body).end();
    else result.send("global handler: "+ error.stack).end();
});
app.use((request, result, next) => result.status(404).end("404"));

//start
app.listen(3000, () => console.log("Ready"));

connect();
seed();
