"use strict";
 
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import mustache from 'mustache-express';
import { connect, seed } from './db';
import compression from "compression";
import serveStatic from "serve-static";

const app = express();

//settings
app.engine('mustache', mustache());
app.use(compression());
app.use(bodyParser.json());
app.set('views', './src/server/views');
app.set('view engine', 'mustache');
  
//static files
app.use(serveStatic("public", {maxAge: "1 day"}));

//routes
app.use("/api", routes);
app.use("/", (request, result) => result.render('index'));

//global handlers
app.use((error, request, result, next) => {
    result.status(error.status ||  500);

    if(error.body) result.json(error.body).end();
    else result.send("global handler: " + error.stack).end();
});
app.use((request, result, next) => result.status(404).end());

//start
app.listen(3000, () => console.log("Ready"));

connect();
seed();
