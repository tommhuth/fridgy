"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api';
import appRoutes from './routes/app';
import mustache from 'mustache-express';
import * as database from './db';
import compression from "compression";
import serveStatic from "serve-static";
import {NotFoundError} from "./errors/not-found-error";

const app = express();

//settings
app.engine('mustache', mustache());
app.use(compression());
app.use(bodyParser.json());
app.set('views', './src/server/views');
app.set('view engine', 'mustache');

//static files
app.use(serveStatic("public", { maxAge: "1 day" }));

//routes
app.use("/api", apiRoutes);
app.use("/", appRoutes);

//global error handler
app.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).end();
    }

    if (err.status === 404) {
        return next();
    }

    let error = {
        message: "Oops!",
        status: err.status || 500,
        ...err
    };
 
    res.status(error.status);
    res.send(error);
});
// 404 error handler
app.use((req, res, next) => res.status(404).end());

//start
database
    .connect()
    .then(() => {
        database.seed();
        app.listen(3000, () => console.log("Ready at :3000"));
    })
    .catch(console.error.bind("Error conneting to mongodb "));

process.on("exit", database.disconnect);
