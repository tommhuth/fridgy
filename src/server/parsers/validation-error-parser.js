"use strict"

import { ValidationError } from "../errors/validation-error"

export default function(error) {
    if (error.name === "ValidationError") {
        throw new ValidationError(error.errors)
    }

    throw error
}
           
