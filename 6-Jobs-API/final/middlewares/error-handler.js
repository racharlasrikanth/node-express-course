const { StatusCodes } = require('http-status-codes');
const { CustomAPIError } = require('./../errors');

const errorHandlerMiddleware = (err, req, res, next) => {

    let customErrorObj = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later'
    }

    // if(err instanceof CustomAPIError){
    //     return res.status(err.statusCode).json({ msg: err.message })
    // }

    // email duplicate error
    if(err.code && err.code === 11000){
        customErrorObj.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`,
        customErrorObj.statusCode = StatusCodes.BAD_REQUEST
    }

    // while register validation error (MONGO DB)
    if(err.name === "ValidationError"){
        customErrorObj.msg = Object.values(err.errors).map((item) => {
            return item.message
        }).join(', '),
        customErrorObj.statusCode = StatusCodes.BAD_REQUEST
    }

    // cast error
    if(err.name === 'CastError'){
        customErrorObj.msg = `No item found with id: ${err.value}`,
        customErrorObj.statusCode = StatusCodes.NOT_FOUND
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    return res.status(customErrorObj.statusCode).json({ msg: customErrorObj.msg })
}

module.exports = errorHandlerMiddleware;