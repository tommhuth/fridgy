import { readFileSync, writeFileSync } from "fs"
import path from "path"
import config from "./config/config-loader"

const filePath = path.join(__dirname, "..", "..", "version.json")

export function incrementVersion() { 
    setVersion(getVersion() + 1)  
}

export function setVersion(v) { 
    writeFileSync(filePath, JSON.stringify({ version: v }))
}


export function getVersion() { 
    try { 
        let { version } = JSON.parse(readFileSync(filePath))

        return version
    } catch (e) {
        setVersion(0)
        
        return 0
    }
}

export function autoVersion(path) { 
    if (config.NODE_ENV !== "production") {
        return path
    }

    return path + "?v=" + getVersion()
}