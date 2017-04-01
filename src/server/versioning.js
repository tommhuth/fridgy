import { readFileSync, writeFileSync } from "fs"
import path from "path"
import config from "./config/config-loader"

const filePath = path.join(__dirname, "..", "..", "version.json")

export function incrementVersion() { 
    writeFileSync(filePath, JSON.stringify({ version: getVersion() + 1 }))
}

export function getVersion() { 
    let { version } = JSON.parse(readFileSync(filePath))

    return version
}

export function autoVersion(path) { 
    if(config.NODE_ENV !== "production") {
        return path
    }

    return path + "?v=" + getVersion()
}