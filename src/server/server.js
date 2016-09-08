"use strict"

import express from "express"
import bodyParser from "body-parser"
import apiRoutes from "./routes/api-routes"
import appRoutes from "./routes/app-routes"
import mustache from "mustache-express"
import connect from "./db-connect"
import compression from "compression"
import serveStatic from "serve-static"
import debug from "debug"
import * as globalErrorHandlers from "./routes/global-error-handlers" 

const app = express()
const log = debug("fridgy-server") 

//settings
app.engine("mustache", mustache())
app.use(compression())
app.use(bodyParser.json())
app.set("views", "./src/server/views")
app.set("view engine", "mustache")

//static files
app.use(serveStatic("public", { maxAge: "1 day" }))

//routes
app.use("/api", apiRoutes)
app.use("/", appRoutes)

//global error handler
app.use(globalErrorHandlers.error)

// 404 error handler
app.use(globalErrorHandlers.notFound)

//start
export default connect() 
    .then(() => {
        return new Promise((resolve) => {
            app.listen(3000, () => {
                log("Ready at :3000")
                resolve(app)
            })
        })
    })
    .catch(log.bind(null, "Error conneting to mongodb"))

 