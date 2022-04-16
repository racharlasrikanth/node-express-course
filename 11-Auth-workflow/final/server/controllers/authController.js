const User = require('./../models/User');
const Token = require('./../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('./../errors');
const { attachCookiesToResponse, createTokenUser, sendVerificationEmail, sendResetPasswordEmail, createHash } = require('./../utils');
const crypto = require('crypto');

const register = async (req, res) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError('Email already exists')
    }

    // first registered user is admin
    const isFirstUser = await User.countDocuments({}) === 0;
    const role = isFirstUser ? "admin" : "user";

    const verificationToken = crypto.randomBytes(40).toString('hex');

    const user = await User.create({ name, email, password, role, verificationToken });

    const origin = 'http://localhost:3000';
    
    // const protocol = req.protocol;
    // const host = req.get('host');
    // const forwardedHost = req.get('x-forwarded-host');
    // const forwardedProtocol = req.get('x-forwarded-proto');

    await sendVerificationEmail({
        email: user.email,
        name: user.name,
        verificationToken: user.verificationToken,
        origin
    });

    // send verification token back only while testing in postman
    res.status(StatusCodes.CREATED).json({message: 'success, please check your email to verify account',});
}

const verifyEmail = async (req, res) => {
    const {verificationToken, email} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        throw new CustomError.UnauthenticatedError('Verification failed');
    }

    if (user.isVerified) {
        res.status(StatusCodes.OK).json({
            message: "user already verified"
        })
        return;
    }

    if (user.verificationToken !== verificationToken) {
        throw new CustomError.UnauthenticatedError('Verification failed');
    }

    user.isVerified = true;
    user.verified = Date.now();
    user.verificationToken = '';

    await user.save();

    res.status(StatusCodes.OK).json({
        message: "email verified"
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new CustomError.BadRequestError("Please provide email or password");
    }

    const user = await User.findOne({ email });
    if(!user){
        throw new CustomError.UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError("Invalid credentials");
    }

    if (!user.isVerified) {
        throw new CustomError.UnauthenticatedError('Please verify your email');
    }

    // if everyting is good, create cookie and set it in response object
    const tokenUser = createTokenUser(user);

    // create refresh token
    let refreshToken = '';

    // check for existing token
    const existingToken = await Token.findOne({user:user._id});

    if (existingToken) {
        const {isValid} = existingToken;
        if (!isValid) {
            throw new CustomError.UnauthenticatedError('Invalid Credentials');
        }
        refreshToken = existingToken.refreshToken;
        attachCookiesToResponse({ res, user:tokenUser, refreshToken });
        res.status(StatusCodes.OK).json({ user: tokenUser });
        return;
    }

    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;
    const userToken = {refreshToken, ipAddress, userAgent, user:user._id};

    await Token.create(userToken);


    attachCookiesToResponse({ res, user:tokenUser, refreshToken });


    res.status(StatusCodes.OK).json({ user:tokenUser });
}

const logout = async (req, res) => {

    await Token.findOneAndDelete({
        user:req.user.userId
    })

    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
        // expires: new Date(Date.now() + 5 * 1000),
    });

    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ message:'user logged out!' })
}

const forgotPassword = async (req, res) => {

    const {email} = req.body;

    if (!email) {
        throw new CustomError.BadRequestError('Please provide valid email');
    }

    const user = await User.findOne({email});

    if (user) {
        const passwordToken = crypto.randomBytes(70).toString('hex');
        
        // send email
        const origin = 'http://localhost:3000';
        await sendResetPasswordEmail({
            name: user.name,
            email: user.email,
            token: passwordToken,
            origin,
        })

        const tenMinutes = 1000 * 60 * 10;
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

        user.passwordToken = createHash(passwordToken);
        user.passwordTokenExpirationDate = passwordTokenExpirationDate;
        await user.save();
    }

    res.status(StatusCodes.OK).json({
        message: 'Please check your email for reset password link'
    });
}

const resetPassword = async (req, res) => {
    const {token, email, password} = req.body;

    if (!token || !email || !password) {
        throw new CustomError.BadRequestError('Please provide all values');
    }

    const user = await User.findOne({email});

    if (user) {
        const currentDate = new Date();

        if (user.passwordToken === createHash(token) && user.passwordTokenExpirationDate > currentDate) {
            user.password = password;
            user.passwordToken = null;
            user.passwordTokenExpirationDate = null;
            await user.save();
        }
    }

    res.send('successs, redirecting to login page shortly');
}

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
}