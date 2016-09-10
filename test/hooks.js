import { close, start } from "../src/server/server"
import seeder from "../src/server/db/seeders"

before(() => {
    return start().then(seeder)
})

after(() => {
    return close()
})