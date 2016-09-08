import nconf from "nconf"

nconf.argv().env().file({ file:"./src/config/defaults.json" })

export default nconf.get()