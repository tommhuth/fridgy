export function error(err, req, res, next) {
    console.error(err);
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).end();
    }

    if (err.status === 404) {
        return next();
    }

    let error = {
        message: "Oops!",
        status: err.status || 500,
        ...err
    };
 
    res.status(error.status);
    res.send(error);
}

export function notFound (req, res, next){
    res.status(404).end();
}