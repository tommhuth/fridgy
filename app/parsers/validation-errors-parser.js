/**
 * Created by tomm.huth on 08/04/16.
 */
"use strict";

module.exports = function (validation) {
    let prettyErrors = {
        "status": 422,
        "message": validation.message,
        "errors": []
    };

    for (var key in validation.errors) {
        var error = {};

        error[key] = validation.errors[key].message;

        prettyErrors.errors.push(error)
    }

    return prettyErrors;
};