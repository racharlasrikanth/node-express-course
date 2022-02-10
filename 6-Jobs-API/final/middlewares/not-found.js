const { StatusCodes } = require('http-status-codes');

const notFoundErrorMiddleware = (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No Routes Found' })
}

module.exports = notFoundErrorMiddleware;