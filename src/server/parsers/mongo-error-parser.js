"use strict"

import { MongoError } from "../errors/mongo-error"
import { ValidationError } from "../errors/validation-error"
import { DuplicateSlugError } from "../errors/duplicate-slug-error"

export default function(error) {  
    if (error.name === "ValidationError") {
        throw new ValidationError(error.errors)
    }
    
    if (error.code === 11000) {  
        throw new DuplicateSlugError()
    }

    if (error.errmsg) {  
        throw new MongoError(error.errmsg, error.code)
    }
 
    throw error
}
           
