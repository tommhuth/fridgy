"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api-routes';
import appRoutes from './routes/app-routes';
import mustache from 'mustache-express';
import * as database from './db';
import compression from "compression";
import serveStatic from "serve-static";
import * as globalErrorHandlers from "./routes/global-error-handlers";
import { NotFoundError } from "./errors/not-found-error";

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
app.use(globalErrorHandlers.error);

// 404 error handler
app.use(globalErrorHandlers.notFound);

//start
database
    .connect()
    .then(database.seed)
    .then(() => {
        app.listen(3000, () => console.log("Ready at :3000"));
    })
    .catch(console.error.bind("Error conneting to mongodb or seeding"));

process.on("exit", database.disconnect);
