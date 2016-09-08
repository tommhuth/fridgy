"use strict"

import mongoose from "mongoose"
import config from "../../config/config-loader"
import seeder from "./items-seeder"
import debug from "debug"

const log = debug("fridgy-server:db")
mongoose.Promise = Promise

function getConnectionString() {
    switch (config.NODE_ENV) {
    case "test-dev":
        return config.CONNECTION_STRING_DEV_TEST
    case "dev":
        return config.CONNECTION_STRING_DEV
    case "prod":
        return config.CONNECTION_STRING_PROD
    case "prod-test":
        return config.CONNECTION_STRING_PROD_TEST
    }
}

function connect() {
    return new Promise((resolve, reject) => {
        let connectionString = getConnectionString()

        mongoose.connect(connectionString, { server: { poolSize: config.CONNECTION_POOL_SIZE } })
        mongoose.connection.on("open", resolve)
        mongoose.connection.on("error", reject)

        log(`Connecting to ${connectionString} [${config.NODE_ENV}]`)
    })
}

export default function () {
    return connect()
        .then(() => {
            return config.NODE_ENV === "test" ? seeder() : null
        })
}

process.on("exit", mongoose.connection.close)
process.on("SIGINT", mongoose.connection.close)
process.on("SIGTERM", mongoose.connection.close)