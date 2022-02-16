const User = require('./../models/Users');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('./../errors');

const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Invalid')
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // attch the user to the job routes

        // using database
        // const user = User.findById(payload.userId).select('-password');
        // req.user = user;

        req.user = {userId:payload.userId, name:payload.name}
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

module.exports = auth;