const { close, start } = require( "../build/server/server")
const seeder = require( "../build/server/db/seeders").default

before(() => {
    return start().then(seeder)
})

after(() => {
    return close()
})