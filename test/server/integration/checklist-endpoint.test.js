const { expect } = require("chai")
const { app } = require("../../../build/server/server")
const supertest = require("supertest") 
const config = require("../../../build/server/config/config-loader").default

suite("API: /api/checklist")
  
test("Should get checklisted items for 1. jan 2000", function (done) {
    supertest(app)
        .get("/api/checklist/2000-01-01")
        .set("Authorization", config.READ_AUTH_TOKEN)
        .expect(200)
        .expect(res => {
            res = res.body

            expect(res).to.be.an("array") 
            expect(res.length).to.be.above(1)
        })
        .end(done)
})
