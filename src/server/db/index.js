"use strict"

import mongoose from "mongoose"
import seeder  from "./items-seeder"

mongoose.Promise = Promise

export function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/fridgy")
        mongoose.connection.on("open", resolve)
        mongoose.connection.on("error", reject)
    })
}

export function seed() {
    seeder()
}

export const disconnect = mongoose.disconnect