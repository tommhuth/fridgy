"use strict";

export default function (validation) {
    let prettyErrors = {
        "status": 422,
        "message": validation.message,
        "errors": []
    };

    for (let key in validation.errors) {
        let error = {};

        error[key] = validation.errors[key].message;

        prettyErrors.errors.push(error)
    }

    return prettyErrors;
}