const { StatusCodes } = require('http-status-codes');
const errorHandleMiddleware = (err, req, res, next) => {
    
    // custom error object
    let customError = {
        // set default message and status code
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, please try later",
    };

    // mongodb database errors
    if (err.name === "ValidationError") {
        customError.message = Object.values(err.errors).map((item) => item.message).join(",");
        customError.statusCode = 400;
    }

    if (err.code && err.code === 11000) {
        customError.message = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        customError.statusCode = 400;
    }

    if (err.name === 'CastError') {
        customError.message = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({ message: customError.message })
}

module.exports = errorHandleMiddleware;