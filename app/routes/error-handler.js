/**
 * Created by Tomm on 07.04.2016.
 */

module.exports = function (data) {
    console.log(data);
    if ((Array.isArray(data) && !data.length) || !data) {
        var error = new Error();

        error.status = 404;
        throw error;
    }

    return data;
};
