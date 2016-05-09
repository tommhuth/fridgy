/**
 * Created by Tomm on 07.04.2016.
 */
"use strict";

export default function (data) {
    let error = new Error();

    if ((Array.isArray(data) && !data.length) || !data) {
        error.status = 404;

        throw error;
    }

    if(typeof data === Error) {
        error.status = 500;

        throw error;
    }

    return data;
}
