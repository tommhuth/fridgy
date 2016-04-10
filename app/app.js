"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import { connect, seed } from './db';

let app = express();
 
app.use(bodyParser.json());

app.use("/api", routes);

app.use((error, request, result, next) => {
    result.status(error.status ||  500);

    if(error.body) result.json(error.body).end();
    else result.send(error.stack).end();
});
app.use((request, result, next) => result.status(404).end("404"));

app.listen(3000, () => console.log("Ready"));

connect();
seed();
