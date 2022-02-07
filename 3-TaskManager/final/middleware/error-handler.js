const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(500).json({message: err})
}

module.exports = errorHandlerMiddleware;