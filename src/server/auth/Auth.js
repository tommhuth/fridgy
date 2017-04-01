import config from "../config/config-loader"

class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super()
        this.status = 403
        this.message = message
    }
}

export class Auth {
    static getAccessLevel(token) {
        let level = 0

        if (token === config.READ_AUTH_TOKEN || token === config.WRITE_AUTH_TOKEN) { 
            level = 1
        }

        if(token === config.WRITE_AUTH_TOKEN) {
            level = 2
        }

        if(!level) {
            throw new UnauthorizedError()
        }

        return {
            token,
            level
        }
    }
    static requireReadAccess() {
        return (req, res, next) => {
            let authToken = req.headers["authorization"]

            if (authToken === config.READ_AUTH_TOKEN || authToken === config.WRITE_AUTH_TOKEN) {
                next()
            } else {
                next(new UnauthorizedError())
            }
        }
    }

    static requireWriteAccess() {
        return (req, res, next) => {
            let authToken = req.headers["authorization"]

            if (authToken === config.WRITE_AUTH_TOKEN) {
                next()
            } else {
                next(new UnauthorizedError())
            }
        }
    }
}