const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

const isTokenValid = ( token ) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
    const accessTokenJWT = createJWT({ payload:{ user } });
    const refreshTokenJWT = createJWT({ payload:{ user, refreshToken } });

    // adding cookie to response
    const oneDay = 1000 * 60 * 60 * 24;
    const longerExp = ondDay * 30;

    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production" ? true : false,
        signed: true,
        // maxAge: 1000 * 60 * 15,
    });

    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + longerExp),
        secure: process.env.NODE_ENV === "production" ? true : false,
        signed: true,
    });
}

// const attachSingleCookieToResponse = ({ res, user }) => {
//     const token = createJWT({ payload:user });

//     // adding cookie to response
//     const oneDay = 1000 * 60 * 60 * 24;
//     res.cookie('token', token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + oneDay),
//         secure: process.env.NODE_ENV === "production" ? true : false,
//         signed: true,
//     });
// }

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}