import "babel-polyfill"
import express from "express"
import bodyParser from "body-parser"
import path from "path"
import apiRoutes from "./routes/api-routes"
import appRoutes from "./routes/app-routes"
import * as connector from "./db/connector"
import compression from "compression"
import serveStatic from "serve-static"
import debug from "debug"
import seeder from "./db/seeders"
import config, { base as baseConfig } from "./config/config-loader"
import * as globalErrorHandlers from "./routes/global-error-handlers"
import { autoVersion } from "./versioning" 

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
            if (config.SEED) {
                return seeder()
            }
        })
        .catch(log)
}

export function close() {
    return new Promise((resolve) => {
        if (server) {
            server.close()
        }

        resolve()
    })
}

// force SSL in production
// this is disabled for now, running on free dyno only
/*
app.use((req, res, next) => {
    if (config.NODE_ENV === "production") {
        if (req.headers["x-forwarded-proto"] !== "https") {
            return res.redirect("https://" + req.get("host") + req.url)
        }
    }

    next() 
})
*/

// settings 
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// views
app.set("views", path.join(__dirname, "..", "..", "resources/views"))
app.set("view engine", "pug")

// versioning for reources
app.locals.autoVersion = autoVersion 

// static files
app.use(serveStatic(path.join(__dirname, "..", "..", "public"), { maxAge: config.NODE_ENV === "production" ? "1 year": 0 }))

//routes
app.use("/api", apiRoutes)
app.use("/", appRoutes)

// global error handler 
app.use(globalErrorHandlers.error)

// 404 error handler
app.use(globalErrorHandlers.notFound)

// start
if (!config.NODE_ENV.includes("test")) {
    start()
}

