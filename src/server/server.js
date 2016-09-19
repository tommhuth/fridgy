"use strict"

import express from "express"
import bodyParser from "body-parser"
import apiRoutes from "./routes/api-routes"
import appRoutes from "./routes/app-routes"
import mustache from "mustache-express"
import * as connector from "./db/connector"
import compression from "compression"
import serveStatic from "serve-static"
import debug from "debug"
import seeder from "./db/seeders"
import config, { base as baseConfig } from "../config/config-loader"
import * as globalErrorHandlers from "./routes/global-error-handlers"

export const app = express()
const log = debug("fridgy-server")
let server 

export function start() {
    return connector.connect()
        .then(() => {
            return new Promise((resolve) => {
                server = app.listen(config.PORT, () => {  
                    log(`Ready @ localhost:${config.PORT}`, baseConfig)
                    resolve(app)
                })
            }) 
        })
        .then(() => {
            if(config.SEED) { 
                return seeder()
            }
        })
        .catch(e => log(e))
}

export function close() {
    return new Promise((resolve) => {
        server ? server.close(resolve) : resolve()
    })
} 

// settings
app.engine("mustache", mustache())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set("views", "./src/server/views")
app.set("view engine", "mustache")

// static files
app.use(serveStatic("public", { maxAge: "1 day" }))

//routes
app.use("/api", apiRoutes)
app.use("/", appRoutes)

// global error handler 
app.use(globalErrorHandlers.error)

// 404 error handler
app.use(globalErrorHandlers.notFound)

// start
if(!config.NODE_ENV.includes("test")){
    start()
}

