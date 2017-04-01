import { readFileSync } from "fs"
import path from "path"
import config from "./config/config-loader"
  
export function getVersion() {  
    let { version } = JSON.parse(readFileSync(path.join(__dirname, "..", "..", "package.json")))

    return version 
}

export function autoVersion(path) { 
    if (config.NODE_ENV !== "production") {
        return path
    }

    return path + "?v=" + getVersion()
}