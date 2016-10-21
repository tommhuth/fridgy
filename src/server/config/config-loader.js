import nconf from "nconf"
import fs from "fs" 

const defaults = JSON.parse(fs.readFileSync(__dirname + "/defaults.json"))
 
nconf.argv().env().defaults(defaults)

export default nconf.get()
export const base = {}

for (let key in nconf.get()) {
    if (defaults.hasOwnProperty(key) && key != "type" && nconf.get(key) != "literal") {
        base[key] = nconf.get(key)
    }
}
 