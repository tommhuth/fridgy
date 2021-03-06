import mongoose from "mongoose"
import config from "../config/config-loader"
import debug from "debug"

const log = debug("fridgy-server:db")

mongoose.Promise = global.Promise

function getConnectionString() {
    if( config.NODE_ENV === "test"){
        return config.CONNECTION_STRING_TEST
    } else {
        return config.CONNECTION_STRING  
    }
}

export function connect() {
    return new Promise((resolve, reject) => {
        let connectionString = getConnectionString()

        mongoose.connect(connectionString, { server: { poolSize: config.CONNECTION_POOL_SIZE } })
        mongoose.connection.on("open", () => {
            log(`Connected to ${connectionString} [${config.NODE_ENV}]`)
            resolve()
        })
        mongoose.connection.on("error", reject)
    })
}

export function disconnect() {
    log("Manual close() called")

    mongoose.connection.close()
}

