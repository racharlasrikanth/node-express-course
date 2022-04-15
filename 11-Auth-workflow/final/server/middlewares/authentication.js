const CustomError = require('./../errors');
const { isTokenValid } = require('./../utils');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if(!token){
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }
    
    try {
        const { name, email, role, userId } = isTokenValid({ token });
        req.user = { name, email, role, userId };
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError("Authentication Invalid");   
    }
}

const authorizePermissions = (...restOfRoles) => {
    return (req, res, next) => {
        if(!restOfRoles.includes(req.user.role)) {
            throw new CustomError.UnauthenticatedError("Unauthorized access to this route");
        }
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizePermissions,
}