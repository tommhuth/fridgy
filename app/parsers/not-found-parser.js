/**
 * Created by Tomm on 07.04.2016.
 */
"use strict";

module.exports = function (data) {
    if ((Array.isArray(data) && !data.length) || !data) {
        var error = new Error();

        error.status = 404;
        throw error;
    }

    return data;
};
