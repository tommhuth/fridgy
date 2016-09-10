"use strict"

import mongoose from "mongoose"
import config from "../../config/config-loader"
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

export function connect() {
    return new Promise((resolve, reject) => {
        let connectionString = getConnectionString()

        mongoose.connect(connectionString, { server: { poolSize: config.CONNECTION_POOL_SIZE } })
        mongoose.connection.on("open", () => {
            resolve()
            log(`Connected to ${connectionString} [${config.NODE_ENV}]`)
        })
        mongoose.connection.on("error", reject)
    })
}

export function disconnect() {
    log("Manual close() called")

    mongoose.connection.close()
}

