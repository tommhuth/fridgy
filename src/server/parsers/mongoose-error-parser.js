"use strict"

import { MongooseError } from "../errors/mongoose-error"

export default function(error) {
    if (error.errmsg) { 
        throw new MongooseError(error.errmsg, error.code)
    }

    return error
}
           
