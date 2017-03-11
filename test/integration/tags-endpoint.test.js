const { expect } = require("chai")
const { app } = require("../../build/server/server")
const supertest = require("supertest")
const config = require("../../build/server/config/config-loader").default

suite("API: /api/tags")

test("Should get all tags aggregated", function (done) {
    supertest(app)
        .get("/api/tags")
        .set("Authorization", config.READ_AUTH_TOKEN)
        .expect(200)
        .expect(res => {
            res = res.body

            expect(res).to.be.an("array")
            expect(res.length).to.be.above(0)
            expect(res[0]).to.be.a("string")
        })
        .end(done)
})
